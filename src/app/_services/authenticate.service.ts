import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticateService {

    authState: any = null;
    currentUserAnonymous: any;
    loading: any;

    base_url: string = 'https://api.giftplush.com/api/';


    constructor(private http: Http, private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,) {  

        this.afAuth.authState.subscribe((auth) => {
              this.authState = auth
        });

    }

    // Firebase Authentication

    emailSignUp(email:string, password:string, userInfos: any) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    emailLogin(email:string, password:string){
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    // Returns true if user is logged in
    get authenticated(): boolean {
        return this.authState !== null;
    }

    // Returns current user data
    get currentUser(): any {
        return this.authenticated ? this.authState : null;
    }

    // Returns
    get currentUserObservable(): any {
        return this.afAuth.authState
    }

    // Returns current user UID
    get currentUserId(): string {
        return this.authenticated ? this.authState.uid : '';
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
        return this.authState['displayName'] || 'User without a Name'
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


    // PHP Authentication

    login(username: string, password: string) {
        return this.http.get(this.base_url+'autho/login/?identity='+username+'&password='+password, this.jwt())
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                // if (user && user.token) {
                //     // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                // }
                console.log(user);
            });
    }

    signup(user: any ) {
        return this.http.get(this.base_url+'autho/register/?user='+JSON.stringify(user)).map((response: Response) => response.json());
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
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