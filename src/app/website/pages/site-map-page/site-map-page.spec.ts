import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SiteMapPage } from './site-map-page';

describe('SiteMapPage', () => {
  let component: SiteMapPage;
  let fixture: ComponentFixture<SiteMapPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteMapPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SiteMapPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  }, 60000);

  it('should create the site map page component', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 hero highlight stat cards', () => {
    expect(component.stats.length).toBe(3);
    expect(component.stats[0].label).toBe('Indexed Routes');
  });

  it('should have 4 sitemap category groups', () => {
    expect(component.sitemapGroups.length).toBe(4);
    expect(component.sitemapGroups[0].id).toBe('core-pages');
    expect(component.sitemapGroups[3].id).toBe('legal-governance');
  });

  it('should filter links dynamically when searchQuery changes', () => {
    component.searchQuery.set('privacy');
    const filtered = component.filteredGroups();
    expect(filtered.length).toBeGreaterThan(0);
    const hasPrivacy = filtered.some((g) =>
      g.links.some((l) => l.title.toLowerCase().includes('privacy')),
    );
    expect(hasPrivacy).toBe(true);
  });

  it('should filter links when activeCategory changes', () => {
    component.setCategory('legal');
    expect(component.activeCategory()).toBe('legal');
    const filtered = component.filteredGroups();
    expect(filtered.length).toBe(1);
    expect(filtered[0].category).toBe('legal');
  });
});

