import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRecipient, Recipient } from '../Models/Recipient';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:5000/api/v1';

  getRecipients(): Observable<IRecipient[]> {
    return this.http.get<IRecipient[]>(
      `${this.url}/recipients/byname?recipientName=D`
    );
  }

  getRecipientByName(name: string): Observable<IRecipient[]> {
    return this.http
      .get<IRecipient[]>(`${this.url}/recipients/byname?recipientName=${name}`)
      .pipe(catchError(err => of([])));
  }

  createRecipient(recipient: IRecipient) {
    return this.http.post<Boolean>(`${this.url}/recipients`, recipient);
  }
}
