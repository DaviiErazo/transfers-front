import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IRecipient } from 'src/app/Models/Recipient';
import { ServiceService } from 'src/app/Service/service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  createRecipient: FormGroup;
  submitted = false;
  loading = false;
  title = 'Nuevo Destinatario ';

  constructor(
    private fb: FormBuilder,
    private _service: ServiceService,
    private router: Router,
    private aRoute: ActivatedRoute,
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

  ngOnInit(): void {}

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
          'El empleado fue registrado con exito!',
          'Empleado Registrado',
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
