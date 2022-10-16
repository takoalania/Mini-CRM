import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ClientsService } from '../clients.service';
import { Validators } from 'src/app/shared/validators';
import {Router} from '@angular/router';

@Component({
  selector: 'bg-bpm001',
  templateUrl: './bpm001.component.html',
  styleUrls: ['./bpm001.component.scss']
})
export class Bpm001Component implements OnInit {
  form: FormGroup;
  error;

  constructor(private clientsService: ClientsService, private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  onSaveClient() {
    if (this.form.invalid) {
      return;
    }
    const params = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      plusPoints: this.form.value.plusPoints,
    };
    this.clientsService.createClient(params)
      .subscribe((res) => {
        localStorage.setItem('clientData', JSON.stringify(res));
        this.router.navigate(['/krn']);
        this.form.reset();
      }, err => {
        this.error = err.error;
      });
  }

  get(controlName) {
    return this.form.get(controlName);
  }

  errors(controlName) {
    return this.get(controlName)?.errors ? Object.values(this.get(controlName).errors) : [];
  }

  initForm() {
    this.form = new FormGroup({
      firstName: new FormControl(undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      lastName: new FormControl(undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      plusPoints: new FormControl(undefined, [Validators.required]),
    });
  }

}
