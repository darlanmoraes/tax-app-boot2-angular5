import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClientService } from './shared/client/client.service';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';
import { AuthInterceptor } from './shared/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ClientListComponent } from './client-list/client-list.component';
import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule,
         MatTableModule, MatIconModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ClientTaxComponent } from './client-tax/client-tax.component';
import { DialogComponent } from './client-edit/dialog-component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'client-list', component: ClientListComponent },
  { path: 'client-add', component: ClientEditComponent },
  { path: 'client-edit/:id', component: ClientEditComponent },
  { path: 'client-tax/:id', component: ClientTaxComponent },
  { path: 'implicit/callback', component: OktaCallbackComponent }
];

const oktaConfig = {
  issuer: 'https://dev-324543.oktapreview.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oaeooiygsxOFypHB0h7'
};

@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientEditComponent,
    ClientTaxComponent,
    HomeComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    RouterModule.forRoot(appRoutes),
    OktaAuthModule.initAuth(oktaConfig)
  ],
  entryComponents: [ DialogComponent ],
  providers: [ ClientService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
