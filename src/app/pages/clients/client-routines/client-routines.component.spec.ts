import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRoutinesComponent } from './client-routines.component';

describe('ClientRoutinesComponent', () => {
  let component: ClientRoutinesComponent;
  let fixture: ComponentFixture<ClientRoutinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientRoutinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientRoutinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
