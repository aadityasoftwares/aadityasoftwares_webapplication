import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrustHighlights } from './trust-highlights';

describe('TrustHighlights', () => {
  let component: TrustHighlights;
  let fixture: ComponentFixture<TrustHighlights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustHighlights],
    }).compileComponents();

    fixture = TestBed.createComponent(TrustHighlights);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 core company metrics with exact values', () => {
    expect(component.stats.length).toBe(4);
    expect(component.stats[0].value).toBe('3+');
    expect(component.stats[0].label).toBe('Years of Experience');
    expect(component.stats[1].value).toBe('100%');
    expect(component.stats[1].label).toBe('Client Happy Ratio');
    expect(component.stats[2].value).toBe('12+');
    expect(component.stats[2].label).toBe('Projects Delivered');
    expect(component.stats[3].value).toBe('1');
    expect(component.stats[3].label).toBe('Own SaaS Product');
  });

  it('should emit contactClick when onContact is called', () => {
    let emitted = false;
    component.contactClick.subscribe(() => (emitted = true));
    component.onContact();
    expect(emitted).toBe(true);
  });
});

