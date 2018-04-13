import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTaxComponent } from './client-tax.component';

describe('ClientTaxComponent', () => {
  let component: ClientTaxComponent;
  let fixture: ComponentFixture<ClientTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
