import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TestApi {

  constructor(private httpClient: HttpClient) {
  }

  queryItems(pageIndex: number, pageSize: number): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('pageIndex', pageIndex.toString());
    httpParams = httpParams.set('pageSize', pageSize.toString());
    return this.httpClient.get(`/api/item`, {params: httpParams});
  }

  createItem(dto: any): Observable<any> {
    return this.httpClient.post(`/api/item`, dto);
  }

  queryNews(): Observable<any> {
    return this.httpClient.get(`/api/baidu/news/passport`);
  }
}
