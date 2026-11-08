import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ServicesPage } from './services-page';

describe('ServicesPage', () => {
  let component: ServicesPage;
  let fixture: ComponentFixture<ServicesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  }, 30000);

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 7 core engineering services', () => {
    expect(component.services.length).toBe(7);
  });

  it('should filter services by category', () => {
    expect(component.filteredServices.length).toBe(7);
    component.filterCategory('mobile');
    expect(component.filteredServices.length).toBe(1);
    expect(component.filteredServices[0].id).toBe('mobile-development');
    component.filterCategory('all');
    expect(component.filteredServices.length).toBe(7);
  });

  it('should manage interactive ribbon selection', () => {
    expect(component.activeRibbonId()).toBe('custom-software');
    component.selectRibbon('ai-workflows');
    expect(component.activeRibbonId()).toBe('ai-workflows');
  });

  it('should have 3 featured case study deliverables for gallery', () => {
    expect(component.showcaseProjects.length).toBe(3);
    expect(component.showcaseProjects[0].name).toBe('SGTC India');
    expect(component.showcaseProjects[1].name).toBe('OonLoop Marketplace Ecosystem');
    expect(component.showcaseProjects[2].name).toBe('StickyJi Digital Workspace SaaS');
  });

  it('should have 3 engagement models', () => {
    expect(component.engagementModels.length).toBe(3);
    expect(component.engagementModels[0].title).toBe('Dedicated Engineering Team');
    expect(component.engagementModels[1].title).toBe('Fixed-Scope Project Delivery');
    expect(component.engagementModels[2].title).toBe('CTO & Architecture Advisory');
  });
});
