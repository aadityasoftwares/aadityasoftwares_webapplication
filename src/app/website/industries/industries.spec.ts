import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Industries } from './industries';

describe('Industries', () => {
  let component: Industries;
  let fixture: ComponentFixture<Industries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Industries],
    }).compileComponents();

    fixture = TestBed.createComponent(Industries);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 industry sectors with case references', () => {
    expect(component.industries.length).toBe(6);
    const titles = component.industries.map((i) => i.title);
    expect(titles.some((t) => t.includes('Logistics'))).toBe(true);
    expect(titles.some((t) => t.includes('Marketplaces'))).toBe(true);
    expect(titles.some((t) => t.includes('SaaS'))).toBe(true);
  });
});

