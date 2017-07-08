import { Injectable } from '@angular/core';
import { Http, Response , RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {User} from './../model/User.model';

@Injectable()
export class UserDataService{

  public authToken : string;
  constructor (private http: Http) {}

  public get(url:string , authorizationHeader : boolean ){

    if(authorizationHeader){

      let headers:Headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.authToken}`);
      let options = new RequestOptions({ headers: headers });

      return this.http.get(url , options)
                      .map(this.extractData)
                      .catch(this.handleError);
    }else{

      return this.http.get(url)
                      .map(this.extractData)
                      .catch(this.handleError);
    }

  }

  public setToken(token){this.authToken = token}

  public post(url:string , userData:User){
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });

    return this.http.post(url, userData, options)
                 .map(this.extractData)
                 .catch(this.handleError);
  }

  private extractData(res: Response) {return  res.json() || { };}


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
  }
}
