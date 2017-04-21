import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeHopsComponent } from './recipe-hops.component';

describe('RecipeHopsComponent', () => {
  let component: RecipeHopsComponent;
  let fixture: ComponentFixture<RecipeHopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeHopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeHopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
