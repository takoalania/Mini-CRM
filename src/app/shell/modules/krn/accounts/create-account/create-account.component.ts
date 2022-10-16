import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AccountsService} from '../../accounts.service';
import {Router} from '@angular/router';
import {Validators} from '../../../../../shared/validators';
import {ClientsService} from '../../../bpm/clients.service';

@Component({
  selector: 'bg-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  form: FormGroup;
  error;

  constructor(
    private accountsService: AccountsService,
    private router: Router,
    private clientsService: ClientsService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  onCreateAccount() {
    if (this.form.invalid) {
      return;
    }
    const clientData = JSON.parse(localStorage.getItem('clientData'));
    const params = {
      accountName: this.form.value.accountName,
      amount: this.form.value.amount,
      clientKey: clientData.clientKey,
    };
    this.accountsService.createAccount(params)
      .subscribe(() => {
        this.fetchClients('', '', clientData.clientKey);
        this.router.navigate(['/krn/accounts']);
        this.form.reset();
      }, err => {
        this.error = err.error;
      });
  }

  private fetchClients(firstName = '', lastName = '', clientKey = '') {
    this.clientsService
      .fetchClients(firstName, lastName, clientKey).subscribe((clients) => {
        const newClients = clients[0];
        localStorage.setItem('clientData', JSON.stringify(newClients));
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
      accountName: new FormControl(undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      amount: new FormControl(undefined, [Validators.required]),
    });
  }
}
