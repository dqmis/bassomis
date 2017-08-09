import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Category } from '../interfaces/category';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { UserService } from './user.service';

export class Delete{
  id: string;
}

export class Create{
  title: string;
}

@Injectable()
export class CategoriesService {

  private categoriesUrl = 'http://localhost:8080/categories/getAll';
  private CategoryUrl = 'http://localhost:8080/categories/get/';
  private deleteUrl = 'http://localhost:8080/categories/delete';
  private createUrl = 'http://localhost:8080/categories/create';
  private updateUrl = 'http://localhost:8080/categories/update';

  constructor(
    private http: Http,
    private UserService: UserService
  ) { }

  getCategories(): Observable<Category[]>{
    return this.http.get(this.categoriesUrl).map(this.extractData).catch(this.handleError);
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

  sendToDelete(id: string): Observable<Delete> {
  let headers = new Headers({ 'Content-Type': 'application/json' });
   headers.append('Authorization', this.UserService.loadToken());
  let options = new RequestOptions({ headers: headers });

  return this.http.post(this.deleteUrl, { id }, options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  addCategory(title: string, about: string): Observable<Create> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.UserService.loadToken());
    let options = new RequestOptions({ headers: headers });  


    return this.http.post(this.createUrl, {title, about}, options).map(this.extractData).catch(this.handleError);
  }

  getCategoryById(id: string): Observable<Category>{
    return this.http.get(this.CategoryUrl + id).map(this.extractData).catch(this.handleError)
  }
  editCategory(category: Category){

    var id = category._id;
    var title = category.title;
    var about = category.about;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.UserService.loadToken());
    let options = new RequestOptions({ headers: headers });  

    return this.http.post(this.updateUrl, {id, title, about}, options).map(this.extractData).catch(this.handleError); 
  }

}
