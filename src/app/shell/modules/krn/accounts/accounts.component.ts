import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../shared/auth/auth.service';
import {Router} from '@angular/router';
import {AccountsService} from '../accounts.service';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {ClientsService} from '../../bpm/clients.service';

@Component({
  selector: 'bg-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  accounts = [];
  isLoading = false;

  constructor(
    private accountsService: AccountsService,
    private authService: AuthService,
    private router: Router,
    private clientsService: ClientsService
  ) { }

  ngOnInit(): void {
    const clientData = JSON.parse(localStorage.getItem('clientData'));
    this.fetchAccounts(clientData.clientKey);
  }

  private fetchAccounts(clientKey) {
    this.accountsService
      .fetchAccounts(clientKey)
      .pipe((obs) => this.loader(obs))
      .subscribe((accounts) => (this.accounts = accounts));
  }

  onDeleteAccounts(accountKey) {
    this.accountsService
      .deleteAccount(accountKey)
      .pipe((obs) => this.loader(obs))
      .subscribe(
        () => {
          this.accounts = this.accounts.filter((account) => account.accountKey !== accountKey);
          const clientData = JSON.parse(localStorage.getItem('clientData'));
          this.fetchClients('', '', clientData.clientKey);
        },
        (error) => {
          this.accounts = error.error;
        }
      );
  }

  private fetchClients(firstName = '', lastName = '', clientKey = '') {
    this.clientsService
      .fetchClients(firstName, lastName, clientKey).subscribe((clients) => {
      const newClients = clients[0];
      localStorage.setItem('clientData', JSON.stringify(newClients));
    });
  }

  private loader<T>(observable: Observable<T>): Observable<T> {
    this.isLoading = true;
    return observable.pipe(finalize(() => (this.isLoading = false)));
  }
}
