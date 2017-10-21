import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from 'environments/environment';

@Injectable()
export class AuthenticateService { 

    authState: any = null;
    currentUserAnonymous: any;
    loading: any;
    businessInfo: any;

    base_url: string = 'https://api.giftplush.com/api/';


    constructor(private http: Http, public afAuth: AngularFireAuth,
              public db: AngularFireDatabase, public router: Router) {  

        this.afAuth.authState.subscribe((auth) => {
              this.authState = auth
        });

        firebase.initializeApp(environment.firebase);

    }

    // Firebase Authentication

    emailSignUp(email:string, password:string, userInfos: any) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    emailLogin(email:string, password:string){
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    signupUser(email: string, password: string) {
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then( (success) => {
            
        }).catch( error => alert(error.message) );
    }

    emailVerify(): any{
        let user:any = this.afAuth.auth.currentUser;
        console.log(user);
        return user.sendEmailVerification();
    } 

    verifyEmail(code): any{
        return this.afAuth.auth.applyActionCode(code);
    }


    // Returns true if user is logged in
    public authenticated(): boolean {
        return this.authState !== null;
    }


    // Returns current user data
    get currentUser(): any {
        return  this.afAuth.auth.currentUser || null;
    }

    // Returns
    get currentUserObservable(): any {
        return this.afAuth.authState
    }

    // Returns current user UID
    get currentUserId(): string {
        return this.authenticated ? this.authState.uid : '';
    }

    get loggedIn(){
        var user_ = localStorage.getItem('firebase:authUser:AIzaSyCjcD3VQg18WVQn1zu-yf8aKrho6ebl8mM:heisenberg');
        let user = JSON.parse(user_);
        if(user){
            return true;
        }else{
            return false;
        }
    }

    // Returns current user display name or Guest
    get currentUserDisplayName(): string {
        if (!this.authState) {
        return 'Guest'
        }
        else if (this.currentUserAnonymous) {
        return 'Anonymous'
        }
        else {
        return this.authState['displayName'] || 'User without a Name';
        }
    }


    //// Helpers ////
    
    updateUserData(userInfo:any): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features

        const path = `users/${this.currentUserId}`; // Endpoint on firebase
        // const data = {
        //             email: this.authState.email,
        //             name: this.authState.displayName
        //         }
                
        userInfo.email = this.authState.email;

        this.db.object(path).update(userInfo)
        .catch(error => console.log(error));

    }

    updateBusinessData(userInfo:any): void {

        // Writes user name and email to realtime db
        // useful if your app displays information about users or for admin features

        const path = `businessInfo`; // Endpoint on firebase   
        let business: any = {};
        
        console.log(this.currentUserId);
        
        business.user_id = this.currentUserId;
        business.businessName = userInfo.company;
        business.slug = userInfo.slug;
        business.about = userInfo.about;
        business.minAmount = userInfo.minAmount

        var ref = firebase.database().ref();
        
            // Get a key for a new business.
            var newItem = ref
                .child(path)
                .push(business);

            console.log(newItem);

            delete userInfo.company;
            delete userInfo.slug;
            delete userInfo.about;


            userInfo.business_id = newItem.key;
            this.updateUserData(userInfo);
        

    }

    getMerchantBySlug(slug:string): any{
        this.db.list('/businessInfo', {
            query: {
                orderByChild: 'slug',
                equalTo: slug
            }
        }).subscribe(data => {
            return data;
        });
    }


    // PHP Authentication

    login(username: string, password: string) {
        return this.http.get(this.base_url+'autho/login/?identity='+username+'&password='+password, this.jwt())
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                console.log(user);
            });
    }

    signup(user: any ) {
        return this.http.get(this.base_url+'autho/register/?user='+JSON.stringify(user)).map((response: Response) => response.json());
    }

    //Logout Firebase

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('firebase:authUser:AIzaSyCjcD3VQg18WVQn1zu-yf8aKrho6ebl8mM:heisenberg-dev');
        this.afAuth.auth.signOut().then(data => {
            this.router.navigate(['/login']);
        });
    }


    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }


}