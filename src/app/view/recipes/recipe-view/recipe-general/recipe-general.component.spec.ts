import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeGeneralComponent } from './recipe-general.component';

describe('RecipeGeneralComponent', () => {
  let component: RecipeGeneralComponent;
  let fixture: ComponentFixture<RecipeGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
