import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMeasuresComponent } from './client-measures.component';

describe('ClientMeasuresComponent', () => {
  let component: ClientMeasuresComponent;
  let fixture: ComponentFixture<ClientMeasuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientMeasuresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
