import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';

import { Client } from './client.model';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {LoaderService} from '../../../shared/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  createClient(client) {
    return this.http.put<{ id: number }>('clients', client).pipe(
      this.loaderService.useLoader,
      catchError((err) => throwError(err.error)));
  }

  fetchClients(firstName: string, lastName: string, clientKey: string) {
    return this.http.get<Client[]>('clients',
      { params: new HttpParams().set('firstName', firstName).set('lastName', lastName).set('clientKey', String(clientKey)) }).pipe(
      this.loaderService.useLoader,
      catchError((err) => throwError(err.error)));
  }
}
