import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Account } from './account.model';
import { LoaderService } from '../../../shared/loader/loader.service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  createAccount(account) {
    return this.http.put<{ id: number }>('accounts', account).pipe(
      this.loaderService.useLoader,
      catchError((err) => throwError(err.error)));
  }

  fetchAccounts(clientKey: number) {
    return this.http.get<Account[]>('accounts',
      { params: new HttpParams().set('clientKey', String(clientKey)) }).pipe(
      this.loaderService.useLoader,
      catchError((err) => throwError(err.error)));
  }

  fetchAllAccounts() {
    return this.http.get<Account[]>('accounts').pipe(
      this.loaderService.useLoader,
      catchError((err) => throwError(err.error)));
  }

  deleteAccount(accountKey) {
    return this.http.delete('accounts', { params: new HttpParams().set('accountKey', accountKey) }).pipe(
      this.loaderService.useLoader,
      catchError((err) => throwError(err.error)));
  }

  transfer(transferParams) {
    return this.http.post<{ id: number }>('transfer', transferParams).pipe(
      this.loaderService.useLoader,
      catchError((err) => throwError(err.error)));
  }
}
