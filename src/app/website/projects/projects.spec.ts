import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Projects } from './projects';

describe('Projects', () => {
  let component: Projects;
  let fixture: ComponentFixture<Projects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
    }).compileComponents();

    fixture = TestBed.createComponent(Projects);
    component = fixture.componentInstance;
    await fixture.whenStable();
  }, 30000);

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 showcased projects matching specification', () => {
    expect(component.projects.length).toBe(3);
    expect(component.projects[0].title).toBe('SGTC India');
    expect(component.projects[1].title).toBe('OonLoop');
    expect(component.projects[2].title).toBe('StickyJi');
  });

  it('should have SGTC India as a Business Website with Angular tech stack', () => {
    const sgtc = component.projects[0];
    expect(sgtc.category).toBe('Business Website');
    expect(sgtc.techStack).toContain('Angular');
    expect(sgtc.isProprietarySaaS).toBe(false);
  });

  it('should have OonLoop highlighting 4 interconnected platforms', () => {
    const oonloop = component.projects[1];
    expect(oonloop.category).toBe('E-commerce Marketplace');
    expect(oonloop.platforms?.length).toBe(4);
    const platformNames = oonloop.platforms?.map((p) => p.name);
    expect(platformNames).toContain('User Application');
    expect(platformNames).toContain('Vendor Application');
    expect(platformNames).toContain('Rider Application');
    expect(platformNames).toContain('Admin Dashboard');
  });

  it('should have StickyJi marked as proprietary SaaS with 6 key features', () => {
    const stickyji = component.projects[2];
    expect(stickyji.category).toBe('Our SaaS Product');
    expect(stickyji.isProprietarySaaS).toBe(true);
    expect(stickyji.features?.length).toBe(6);
    const featureTitles = stickyji.features?.map((f) => f.title);
    expect(featureTitles).toContain('Digital Sticky Notes');
    expect(featureTitles).toContain('Workspaces and Collaboration');
    expect(featureTitles).toContain('Kanban Task Organization');
    expect(featureTitles).toContain('Labels and Checklists');
    expect(featureTitles).toContain('Cloud File Storage');
    expect(featureTitles).toContain('Authentication and Permissions');
  });

  it('should open and close project details modal', () => {
    expect(component.activeModalProject()).toBeNull();
    component.openProjectModal(component.projects[0]);
    expect(component.activeModalProject()?.id).toBe('sgtc-india');
    component.closeProjectModal();
    expect(component.activeModalProject()).toBeNull();
  });

  it('should emit contactClick when onDiscussProject is called', () => {
    let emitted = false;
    component.contactClick.subscribe(() => (emitted = true));
    component.onDiscussProject();
    expect(emitted).toBe(true);
  });
});

