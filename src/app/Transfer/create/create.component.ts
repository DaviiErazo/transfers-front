import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ICreateTransfer } from '../../Models/Transfer'


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  createTransfer: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  title = 'Transferir';
  alertError = false;

  constructor(
    private fb: FormBuilder,
    private _service: ServiceService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.createTransfer = this.fb.group({
      amount: ['', [Validators.required, Validators.min(100)]],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {}

  closeAlertError() {
    this.alertError = false;
  }

  create() {
    if (this.createTransfer.invalid) {
      this.alertError = true
      return;
    }

    this.submitted = true;
    this.loading = true;

    const transfer: ICreateTransfer = {
      recipientId: this.id ? this.id : '',
      amount: this.createTransfer.value.amount,
    };

    this._service.createTransfer(transfer).subscribe(
      (data) => {
        this.toastr.success(
          'El empleado fue registrado con exito!',
          'Empleado Registrado',
          {
            positionClass: 'toast-bottom-right',
          }
        );
        this.router.navigate(['/history']);
      },
      (err) => {
        this.loading = false;
        this.alertError = true;
        console.log(err);
      }
    );
  }
}