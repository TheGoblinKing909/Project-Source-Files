import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  search(query: string): Observable<any> {
    // this is my own apiKey and is limited to 100 unique searches
    const apiKey = 'AIzaSyB_Mu2QRWzqNU5qwno-s2DLqSVwqQhA6gU';
    // this is my own programmable search engine provided by Google
    const cx = 'd7ebc583e31b54867';
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${cx}&key=${apiKey}`;
    return this.http.get(url).pipe(
      catchError(error => {
        console.log(error);
        return [];
      })
    );
  }

}
