import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Divider } from './divider';

describe('Divider', () => {
  let component: Divider;
  let fixture: ComponentFixture<Divider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Divider],
    }).compileComponents();

    fixture = TestBed.createComponent(Divider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to horizontal orientation and neutral variant', () => {
    expect(component.orientation).toBe('horizontal');
    expect(component.variant).toBe('neutral');
    expect(component.lineStyle).toBe('solid');
    expect(component.thickness).toBe(1);
    expect(component.spacing).toBe('md');
  });

  it('should resolve pixel spacing and thickness correctly', () => {
    component.thickness = 2;
    component.spacing = 'lg';
    expect(component.resolvedThickness).toBe('2px');
    expect(component.resolvedSpacing).toBe('24px');
  });

  it('should display label when provided', () => {
    component.label = 'OR';
    expect(component.showLabel).toBe(true);
  });
});

