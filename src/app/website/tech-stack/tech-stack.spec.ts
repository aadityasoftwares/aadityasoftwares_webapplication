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
    expect(names).toContain('Node.js');
    expect(names).toContain('TypeScript');
    expect(names).toContain('Python');
  });

  it('should assign a valid iconKey for programming languages and tools', () => {
    const angularItem = component.technologies.find((t) => t.name === 'Angular 22');
    expect(angularItem?.iconKey).toBe('angular');

    const pythonItem = component.technologies.find((t) => t.name === 'Python');
    expect(pythonItem?.iconKey).toBe('python');
  });

  it('should filter technologies by category', () => {
    component.setCategory('mobile');
    expect(component.filteredTech().every((t) => t.category === 'mobile')).toBe(true);
  });

  it('should support see more toggle to show all technologies', () => {
    expect(component.showAll()).toBe(false);
    expect(component.displayedTech().length).toBe(component.initialVisibleCount);
    expect(component.hasMoreToSee()).toBe(true);

    component.toggleShowMore();
    expect(component.showAll()).toBe(true);
    expect(component.displayedTech().length).toBe(component.technologies.length);
  });
});

