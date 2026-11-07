import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to primary variant and md size', () => {
    expect(component.variant).toBe('primary');
    expect(component.size).toBe('md');
    expect(component.appearance).toBe('standard');
  });

  it('should handle click events when not disabled', () => {
    let clicked = false;
    component.buttonClick.subscribe(() => (clicked = true));

    const event = new MouseEvent('click');
    component.onButtonClick(event);
    expect(clicked).toBe(true);
  });

  it('should prevent click events when disabled or loading', () => {
    let clicked = false;
    component.buttonClick.subscribe(() => (clicked = true));

    component.disabled = true;
    const event = new MouseEvent('click');
    component.onButtonClick(event);
    expect(clicked).toBe(false);

    component.disabled = false;
    component.loading = true;
    component.onButtonClick(event);
    expect(clicked).toBe(false);
  });
});

