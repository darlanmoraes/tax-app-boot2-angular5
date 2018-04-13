import { ClientService } from '../shared/client/client.service';
import { NgForm } from '@angular/forms';
import { Client } from '../shared/model/client';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-tax',
  templateUrl: './client-tax.component.html',
  styleUrls: ['./client-tax.component.css']
})
export class ClientTaxComponent implements OnInit, OnDestroy {

  client: Client = <Client>{};
  percentage: string;
  values: any = {};
  taxedValue: string;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private clientService: ClientService) {
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
              this.percentage = `${this.getTax()}%`;
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

  private getTax(): number {
    switch (this.client.risk) {
      case 'A': {
        return 1.9;
      }
      case 'B': {
        return 5;
      }
      case 'C': {
        return 10;
      }
    }
  }

  // fv = pv (1 + i)n
  // pv = valor inicial
  // i = % ao mês
  // n = tempo
  onCalculate(form: NgForm) {
    this.taxedValue = (parseInt(this.values.value, 10) * Math.pow((1 + this.getTax() / 100), parseInt(this.values.time, 10))).toFixed(0);
  }

  toList() {
    this.router.navigate([ '/client-list' ]);
  }

}
