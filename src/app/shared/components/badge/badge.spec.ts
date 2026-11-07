import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Badge } from './badge';

describe('Badge', () => {
  let component: Badge;
  let fixture: ComponentFixture<Badge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Badge],
    }).compileComponents();

    fixture = TestBed.createComponent(Badge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to neutral variant, sm size, and pill shape', () => {
    expect(component.variant).toBe('neutral');
    expect(component.size).toBe('sm');
    expect(component.shape).toBe('pill');
  });

  it('should format count when maxCount is exceeded', () => {
    component.count = 120;
    component.maxCount = 99;
    expect(component.displayText).toBe('99+');

    component.count = 42;
    expect(component.displayText).toBe('42');
  });

  it('should emit removed event on remove click', () => {
    let removed = false;
    component.removed.subscribe(() => (removed = true));

    const event = new MouseEvent('click');
    component.remove(event);
    expect(removed).toBe(true);
  });

  it('should not emit removed event when disabled', () => {
    let removed = false;
    component.disabled = true;
    component.removed.subscribe(() => (removed = true));

    const event = new MouseEvent('click');
    component.remove(event);
    expect(removed).toBe(false);
  });
});

