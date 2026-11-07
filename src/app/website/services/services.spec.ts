import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Services } from './services';

describe('Services', () => {
  let component: Services;
  let fixture: ComponentFixture<Services>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Services],
    }).compileComponents();

    fixture = TestBed.createComponent(Services);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 02 as default active service', () => {
    expect(component.activeServiceId()).toBe('02');
  });

  it('should toggle active service on selection', () => {
    const item = component.services[0];
    component.toggleService(item);
    expect(component.activeServiceId()).toBe('01');
  });
});

