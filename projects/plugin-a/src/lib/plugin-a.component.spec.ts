import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginAComponent } from './plugin-a.component';

describe('PluginAComponent', () => {
  let component: PluginAComponent;
  let fixture: ComponentFixture<PluginAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PluginAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PluginAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
