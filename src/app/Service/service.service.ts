import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { IRecipient } from '../Models/Recipient';
import { ITransfer, ICreateTransfer } from '../Models/Transfer';

const API_URL = 'http://localhost:5000/api/v1'
const API_VERSION = 'v1'

const opts: any = {
  headers: new HttpHeaders(),
  responseType: 'text',
};

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  private url = `${API_URL}/${API_VERSION}` ;

  getTransfers(): Observable<ITransfer[]> {
    return this.http.get<ITransfer[]>(`${this.url}/transfers/all`);
  }

  getRecipientByName(name: string): Observable<IRecipient[]> {
    return this.http
      .get<IRecipient[]>(`${this.url}/recipients/byname?recipientName=${name}`)
      .pipe(catchError((err) => of([])));
  }

  createRecipient(recipient: IRecipient) {
    return this.http.post<Boolean>(`${this.url}/recipients`, recipient, opts);
  }

  createTransfer(transfer: ICreateTransfer) {
    return this.http.post<Boolean>(`${this.url}/transfers`, transfer, opts)
  }
}
