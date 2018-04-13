import { Client } from './../shared/model/client';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../shared/client/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[];
  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getAll()
      .subscribe(clients => {
        this.clients = clients;
      }, error => console.error(error));
  }

}
