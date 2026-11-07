import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hero } from './hero';

describe('Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle video modal on play button click', () => {
    expect(component.isVideoModalOpen()).toBe(false);
    component.onPlay();
    expect(component.isVideoModalOpen()).toBe(true);
    component.closeVideoModal();
    expect(component.isVideoModalOpen()).toBe(false);
  });

  it('should emit exploreClick event', () => {
    let emitted = false;
    component.exploreClick.subscribe(() => (emitted = true));
    component.onExplore();
    expect(emitted).toBe(true);
  });
});

