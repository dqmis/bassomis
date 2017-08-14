import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { tokenNotExpired } from 'angular2-jwt';

import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {
  private deleteUrl = 'users/delete';
  private createUrl = 'users/register';
  private getAllUrl = 'users/getAll';
  private autehnticateUrl = 'users/authenticate';
  authToken: any;
  user: any;


  constructor(private http: Http) { }

  registerUser(name: string, username: string, password: string){
    let headers = new Headers();
    headers.append('Authorization', this.loadToken());
    headers.append('Content-Type','application/json');

    return this.http.post(this.createUrl, {name, username, password}, {headers: headers}).map(this.extractData).catch(this.handleError);
  }

  deleteUser(id: string){
    let headers = new Headers();
    headers.append('Authorization', this.loadToken());
    headers.append('Content-Type','application/json');

    return this.http.post(this.deleteUrl, {id}, {headers: headers}).map(this.extractData).catch(this.handleError);
  }

  getUsers(){
    let headers = new Headers();
    headers.append('Authorization', this.loadToken());
    headers.append('Content-Type','application/json');

    return this.http.get(this.getAllUrl, {headers: headers}).map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response){
    let body = res.json();
    return body || {};
  };

    private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  };

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Authorization', this.loadToken());
    headers.append('Content-Type','application/json');

    return this.http.post(this.autehnticateUrl, user, {headers: headers}).map(res => res.json())
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    return token;
  }

  loadUser(){
    const user = localStorage.getItem('user');
    return $.parseJSON(user);
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

}
