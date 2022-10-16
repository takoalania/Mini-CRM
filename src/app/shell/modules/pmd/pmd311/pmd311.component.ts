import {Component, AfterContentChecked, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AccountsService} from '../../krn/accounts.service';
import {Validators} from '../../../../shared/validators';
import {Client} from '../../bpm/client.model';
import {Router} from '@angular/router';
import {ClientsService} from '../../bpm/clients.service';

@Component({
  selector: 'bg-pmd311',
  templateUrl: './pmd311.component.html',
  styleUrls: ['./pmd311.component.scss']
})
export class Pmd311Component implements OnInit, AfterContentChecked {
  form: FormGroup;
  senderAccounts = [];
  receiverAccounts = [];
  clientData: Client;
  error;

  constructor(
    private accountsService: AccountsService,
    private router: Router,
    private clientsService: ClientsService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.clientData = JSON.parse(localStorage.getItem('clientData'));
    this.fetchSenderAccounts(this.clientData.clientKey);
    this.fetchReceiverAccounts();
  }

  ngAfterContentChecked() {
    this.clientData = JSON.parse(localStorage.getItem('clientData'));
  }

  onTransfer() {
    if (this.form.invalid) {
      return;
    }
    const params = {
      senderAccountKey: this.form.value.senderAccount,
      receiverAccountKey: this.form.value.receiverAccount,
      amount: this.form.value.amount,
    };
    this.accountsService.transfer(params)
      .subscribe(() => {
        const clientData = JSON.parse(localStorage.getItem('clientData'));
        this.fetchClients('', '', clientData.clientKey);
        this.router.navigate(['/krn/accounts']);
        this.form.reset();
      }, error => this.error = error);
  }

  private fetchSenderAccounts(clientKey) {
    this.accountsService
      .fetchAccounts(clientKey).subscribe((accounts) => (this.senderAccounts = accounts), error => this.error = error);
  }

  private fetchReceiverAccounts() {
    this.accountsService
      .fetchAllAccounts().subscribe((accounts) => (this.receiverAccounts = accounts), error => this.error = error);
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
        senderAccount: new FormControl(undefined, [Validators.required]),
        receiverAccount: new FormControl(undefined, [Validators.required]),
        amount: new FormControl(undefined, [Validators.required]),
      });
    }
}
