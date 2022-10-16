import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ClientsService } from '../clients.service';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'bg-bpm000',
  templateUrl: './bpm000.component.html',
  styleUrls: ['./bpm000.component.scss'],
})
export class Bpm000Component implements OnInit {
  form: FormGroup;
  clients = [];
  isLoading = false;
  error;
  userSubs: Subscription;
  isLoggedIn: boolean;

  constructor(
    private clientsService: ClientsService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.onFetchClients();
    this.userSubs = this.authService.user.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  initForm() {
    this.form = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      clientKey: new FormControl(''),
    });
  }

  get(controlName) {
    return this.form.get(controlName);
  }

  onFetchClients() {
    this.fetchClients(this.form.value.firstName, this.form.value.lastName, this.form.value.clientKey);
  }

  private fetchClients(firstName = '', lastName = '', clientKey = '') {
    this.clientsService
      .fetchClients(firstName, lastName, clientKey)
      .pipe((obs) => this.loader(obs))
      .subscribe((clients) => (this.clients = clients));
  }

  onClientClick(client) {
    localStorage.setItem('clientData', JSON.stringify(client));
    this.router.navigate(['/krn']);
  }

  private loader<T>(observable: Observable<T>): Observable<T> {
    this.isLoading = true;
    return observable.pipe(finalize(() => (this.isLoading = false)));
  }
}
