import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBankObj } from '../Models/Bank'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = "https://bast.dev/api/banks.php";

  constructor(private http: HttpClient) {}

  getBankList(): Observable<IBankObj> {
    return this.http.get<IBankObj>(this.url)
  }

}
