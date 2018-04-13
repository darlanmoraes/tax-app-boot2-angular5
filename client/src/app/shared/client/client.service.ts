import { Client } from './../model/client';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class ClientService {
  private api = '//localhost:8080/clients';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Client[]> {
    return this.http
      .get(this.api)
      .map((response: any) => {
        const data = response._embedded.clients;
        return data as Client[];
      });
  }

  get(id: string) {
    return this.http.get(this.api + '/' + id)
      .map((response: any) => {
        return response as Client;
      });
  }

  save(client: any): Observable<Client> {
    let result: Observable<Client>;
    if (client['href']) {
      result = this.http.put(client.href, client)
        .map((response: any) => {
          return response as Client;
        });
    } else {
      result = this.http.post(this.api, client)
        .map((response: any) => {
          return response as Client;
        });
    }
    return result;
  }

  delete(href: string) {
    return this.http.delete(href);
  }

}
