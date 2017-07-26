import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
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

  private postsUrl = 'http://localhost:3000/posts/getAll';
  private post1Url = 'http://localhost:3000/posts/getPost';
  private deleteUrl = 'http://localhost:3000/posts/delete';
  private createUrl = 'http://localhost:3000/posts/create';
  private updateUrl = 'http://localhost:3000/posts/update';
  private uploadUrl = 'http://localhost:3000/posts/upload';
  private getPostsCatl = 'http://localhost:3000/posts/getPostsL';

  constructor(
    private http: Http
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
    console.log(body);
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
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });

  return this.http.post(this.deleteUrl, { id })
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  addPost(category: string, title: string, intro: string, content: string, image: string, isImportant: boolean){
    let headers = new Headers();
    const dateCreated = this.formatDate(new Date());
    const dateEdited = dateCreated;
    const initialized = Date.now();
    headers.append('enctype', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.createUrl, {category, title, intro, content, image, isImportant, dateCreated, dateEdited, initialized}).map(this.extractData).catch(this.handleError);
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get(this.post1Url + '/' + id)
                  .map(this.extractData)
                  .catch(this.handleError);
    }

  getPostsbyCategoryL(cat: string): Observable<Post[]>{
    return this.http.get(this.getPostsCatl + '/' + cat).map(this.extractData).catch(this.handleError);
  }

    uploadPhoto(photo: any, id: string){
      let headers = new Headers();
      headers.append('enctype', 'multipart/form-data');
      headers.append('Accept', 'application/json');

      let data = new FormData();
      data.append('photo', photo, id);
      return this.http.post(this.uploadUrl, data).map(this.extractData).map(this.handleError);
    }

}
