import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { MD5 } from 'src/model/MD5';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private site = "https://python-application-results-default-rtdb.firebaseio.com/";
  private md5URL: string = "";
  private pdfURL: string = "";
  private shaURL: string = "";
  private pictureURL: string = "";
  private bruteURL: string = "";
  private testing !: any;

  getMD5(): Observable<Array<Object>>{//Observable<MD5>{//Observable<Array<MD5>>{
    let req = new Subject<Array<Object>>();//Subject<MD5>();//Subject<Array<MD5>>();
    this.http.get<Request>(this.md5URL).subscribe(
      (data: any) => {
        req.next(data);
        // console.log(data);
        this.testing = data;
        // console.log(data.data);
        req.complete();
      }
    );
    // console.log("this is it: " + this.testing);
    return req;
  }

  getSHA(): Observable<Array<Object>>{
    let req = new Subject<Array<Object>>();
    this.http.get<Request>(this.shaURL).subscribe(
      (data: any) => {
        req.next(data);
        // console.log(data);
        req.complete();
      }
    );
    return req;
  }

  getPicture(){

  }

  getBrute(){
    
  }

  constructor(private http: HttpClient) {
    this.md5URL = this.site + "MD5" + ".json";
    this.pdfURL = this.site + "PDF Metadata" + ".json";
    this.pictureURL = this.site + "Picture Metadata" + ".json";
    this.shaURL = this.site + "SHA" + ".json";
    this.bruteURL = this.site + "Brute Force" + ".json";
  }
}