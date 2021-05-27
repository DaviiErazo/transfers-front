import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { IRecipient } from 'src/app/Models/Recipient';
import { IBank, IBankObj } from 'src/app/Models/Bank';
import { ServiceService } from 'src/app/Service/service.service';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  createRecipient: FormGroup;
  submitted = false;
  loading = false;
  title = 'Nuevo Destinatario';
  banks: string[] = [];
  typeAccounts = ['Cuenta Corriente', 'Cuenta Visa', 'Ahorro'];
  alertSucc = false;
  alertError = false;

  constructor(
    private fb: FormBuilder,
    private _service: ServiceService,
    private _dataService: DataService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.createRecipient = this.fb.group({
      name: ['', Validators.required],
      rut: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bank: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(2)]],
      type: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    this._dataService.getBankList().subscribe(
      (data: IBankObj) => {
        this.banks = data.banks.map((data) => data.name);
      },
      (err) => console.log(err)
    );
  }

  closeAlertSucc() {
    this.alertSucc = false;
  }

  closeAlertError() {
    this.alertError = false;
  }

  create() {
    if (this.createRecipient.invalid) {
      this.alertError = true;
      return;
    }

    this.submitted = true;
    this.loading = true;

    const recipient: IRecipient = {
      recipientName: this.createRecipient.value.name,
      rut: this.createRecipient.value.rut,
      email: this.createRecipient.value.email,
      bank: this.createRecipient.value.bank,
      accountNumber: this.createRecipient.value.accountNumber,
      phoneNumber: this.createRecipient.value.phoneNumber,
      type: this.createRecipient.value.type,
    };

    this._service.createRecipient(recipient).subscribe(
      (data) => {
        this.alertSucc = true;
        this.loading = false;
        this.alertError = false;
      },
      (err) => {
        this.loading = false;
        this.alertError = true;
      }
    );
  }
}
