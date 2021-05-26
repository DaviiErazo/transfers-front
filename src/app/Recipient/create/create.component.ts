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
  banks: IBank[] = [];
  typeAccounts = ['Cuenta Corriente', 'Cuenta Visa', 'Ahorro'];

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
        this.banks = data.banks;
      },
      (err) => console.log(err)
    );
  }

  create() {
    if (this.createRecipient.invalid) {
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
        this.toastr.success(
          'El Destinatario fue registrado con exito!',
          'Destinatario Registrado',
          {
            positionClass: 'toast-bottom-right',
          }
        );
        this.loading = false;
        this.router.navigate(['/list']);
      },
      (err) => {
        this.loading = false;
        console.log(err);
      }
    );
  }
}
