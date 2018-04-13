import { ClientService } from '../shared/client/client.service';
import { NgForm } from '@angular/forms';
import { Client } from '../shared/model/client';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog-component';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit, OnDestroy {

  client: Client = <Client>{};
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private clientService: ClientService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.clientService.get(id)
          .subscribe(client => {
            if (client) {
              this.client = client;
              this.client.href = client._links.self.href;
            } else {
              console.log(`Client with id '${id}' can't be found, returning to main list`);
              this.toList();
            }
          });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCheckRemove(href: string) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result === 'yes') {
          this.onRemove(href);
        }
      });
  }

  onSave(form: NgForm) {
    this.clientService.save(form)
      .subscribe(result => {
        this.toList();
      }, error => console.error(error));
  }

  onRemove(href: string) {
    this.clientService.delete(href)
      .subscribe(result => {
        this.toList();
      }, error => console.error(error));
  }

  toList() {
    this.router.navigate([ '/client-list' ]);
  }

}
