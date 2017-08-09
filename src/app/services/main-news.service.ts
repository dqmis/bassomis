import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { UserService } from './user.service';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Post } from '../interfaces/post';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export class Delete{
  id: string;
}

@Injectable()
export class MainNewsService {

  private postsUrl = 'http://localhost:8080/posts/getAll';
  private post1Url = 'http://localhost:8080/posts/getPost';
  private deleteUrl = 'http://localhost:8080/posts/delete';
  private createUrl = 'http://localhost:8080/posts/create';
  private updateUrl = 'http://localhost:8080/posts/update';
  private uploadUrl = 'http://localhost:8080/posts/upload';
  private getPostsCatl = 'http://localhost:8080/posts/getPostsL';
  private getPostsCat = 'http://localhost:8080/posts/getPosts';
  private deltePhotoUrl = 'http://localhost:8080/posts/deletePhoto';

  constructor(
    private http: Http,
    private UserService: UserService
  ) { }

  getPosts(): Observable<Post[]>{
    return this.http.get(this.postsUrl).map(this.extractData).catch(this.handleError);
  }

  formatDate(date){
    var monthNames = [
      "Sausio", "Vasario", "Kovo",
      "Balandžio", "Gegužės", "Birželio",
      "Liepos", "Rugpjūčio", "Rugsėjo",
      "Spalio", "Lapkričio", "Gruodžio"
    ]

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return year + ' ' + monthNames[monthIndex] + ' ' + day;
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
    console.error(errMsg);
    return Observable.throw(errMsg);
  };

  sendToDelete(id: string): Observable<Delete> {
    let headers = new Headers();
    headers.append('Authorization', this.UserService.loadToken());
    headers.append('Content-Type','application/json');

  let options = new RequestOptions({ headers: headers });

  return this.http.post(this.deleteUrl, { id }, options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  addPost(category: string, title: string, intro: string, content: string, image: string, isImportant: boolean){
    let headers = new Headers();
    const dateCreated = this.formatDate(new Date());
    const dateEdited = dateCreated;
    const initialized = Date.now();

    headers.append('Authorization', this.UserService.loadToken());
    headers.append('enctype', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.createUrl, {category, title, intro, content, image, isImportant, dateCreated, dateEdited, initialized}, options).map(this.extractData).catch(this.handleError);
  }

  updatePost(id: string, category: string, title: string, intro: string, content: string, image: string, isImportant: boolean){
    let headers = new Headers();
    const dateEdited = this.formatDate(new Date());
    headers.append('Authorization', this.UserService.loadToken());
    headers.append('enctype', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    
    console.log(isImportant);

    return this.http.post(this.updateUrl, {id, category, title, intro, content, image, isImportant, dateEdited}, options).map(this.extractData).catch(this.handleError);

  }

  getPostById(id: string): Observable<Post> {
    return this.http.get(this.post1Url + '/' + id)
                  .map(this.extractData)
                  .catch(this.handleError);
    }

  getPostsbyCategoryL(cat: string): Observable<Post[]>{
    return this.http.get(this.getPostsCatl + '/' + cat).map(this.extractData).catch(this.handleError);
  }

  getPostsByCategory(cat: string): Observable<Post[]>{
    return this.http.get(this.getPostsCat + '/' + cat).map(this.extractData).catch(this.handleError);
  }


    uploadPhoto(photo: any){
      let headers = new Headers();
      headers.append('Authorization', this.UserService.loadToken());
      headers.append('enctype', 'multipart/form-data');
      headers.append('Accept', 'application/json');

      let data = new FormData();
      data.append('photo', photo);
      return this.http.post(this.uploadUrl, data, {headers: headers}).map(this.extractData).map(this.handleError);
    }

    deltePhoto(key: string){
              let headers = new Headers();
      headers.append('Authorization', this.UserService.loadToken());
      headers.append('enctype', 'multipart/form-data');
      headers.append('Accept', 'application/json');
        key = key.slice(47, key.length);

        return this.http.post(this.deltePhotoUrl, {key}, {headers: headers}).map(this.extractData).map(this.handleError);
    }

}
