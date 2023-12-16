import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArrendadorComponent } from './create-arrendador.component';

describe('CreateArrendadorComponent', () => {
  let component: CreateArrendadorComponent;
  let fixture: ComponentFixture<CreateArrendadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateArrendadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateArrendadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
