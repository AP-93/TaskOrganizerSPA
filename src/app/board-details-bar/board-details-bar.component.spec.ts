import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDetailsBarComponent } from './board-details-bar.component';

describe('BoardDetailsBarComponent', () => {
  let component: BoardDetailsBarComponent;
  let fixture: ComponentFixture<BoardDetailsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardDetailsBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardDetailsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
