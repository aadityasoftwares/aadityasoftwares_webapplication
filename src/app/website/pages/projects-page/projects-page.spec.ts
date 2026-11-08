import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProjectsPage } from './projects-page';

describe('ProjectsPage', () => {
  let component: ProjectsPage;
  let fixture: ComponentFixture<ProjectsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  }, 30000);

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 showcased projects', () => {
    expect(component.projects.length).toBe(3);
    expect(component.projects[0].title).toBe('SGTC India');
    expect(component.projects[1].title).toBe('OonLoop');
    expect(component.projects[2].title).toBe('StickyJi');
  });

  it('should filter projects correctly', () => {
    expect(component.filteredProjects.length).toBe(3);
    component.filterProjects('saas');
    expect(component.filteredProjects.length).toBe(1);
    expect(component.filteredProjects[0].title).toBe('StickyJi');
    component.filterProjects('all');
    expect(component.filteredProjects.length).toBe(3);
  });

  it('should highlight OonLoop 4 platforms and StickyJi 6 features', () => {
    const oonloop = component.projects[1];
    expect(oonloop.platforms?.length).toBe(4);

    const stickyji = component.projects[2];
    expect(stickyji.features?.length).toBe(6);
    expect(stickyji.isProprietarySaaS).toBe(true);
  });
});

