import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ServiceService } from 'src/app/Service/service.service';
import { ITransfer } from '../../Models/Transfer';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  transfers: ITransfer[];

  constructor(private service: ServiceService, private router: Router) {
    this.transfers = [];
  }

  ngOnInit(): void {
    this.service.getTransfers().subscribe((data) => {
      this.transfers = data;
    });
  }
}
