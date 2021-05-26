import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRecipient } from 'src/app/Models/Recipient';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  recipients: IRecipient[];
  constructor(private service: ServiceService, private router: Router) {
    this.recipients = [];
  }

  ngOnInit(): void {
    this.service.getRecipients().subscribe((data) => {
      this.recipients = data;
    });
  }
}
