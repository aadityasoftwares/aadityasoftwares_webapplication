import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechStack } from './tech-stack';

describe('TechStack', () => {
  let component: TechStack;
  let fixture: ComponentFixture<TechStack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechStack],
    }).compileComponents();

    fixture = TestBed.createComponent(TechStack);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list modern technologies', () => {
    expect(component.technologies.length).toBeGreaterThanOrEqual(10);
    const names = component.technologies.map((t) => t.name);
    expect(names).toContain('Angular 22');
    expect(names).toContain('React Native');
    expect(names).toContain('Node.js & Express.js');
  });

  it('should filter technologies by category', () => {
    component.setCategory('mobile');
    expect(component.filteredTech().every((t) => t.category === 'mobile')).toBe(true);
  });
});

