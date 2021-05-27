import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IRecipient } from 'src/app/Models/Recipient';

import { ServiceService } from 'src/app/Service/service.service';
import { liveSearch } from './live-search.operator';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  private recipientNameSubject = new Subject<string>();
  readonly recipientsDetail$: Observable<IRecipient[]>;

  constructor(private service: ServiceService) {
    this.recipientsDetail$ = this.recipientNameSubject.pipe(
      liveSearch(
        (recipientName) => this.service.getRecipientByName(recipientName),
        250
      )
    );
  }

  ngOnInit(): void {}

  searchRecipients(recipientName: string) {
    this.recipientNameSubject.next(recipientName);
  }
}
