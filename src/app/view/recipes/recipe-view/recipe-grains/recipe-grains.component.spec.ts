import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeGrainsComponent } from './recipe-grains.component';

describe('RecipeGrainsComponent', () => {
  let component: RecipeGrainsComponent;
  let fixture: ComponentFixture<RecipeGrainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeGrainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeGrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
