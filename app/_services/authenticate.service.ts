import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticateService {

    base_url: string = 'http://localhost/white/api/';


    constructor(private http: Http) { }

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