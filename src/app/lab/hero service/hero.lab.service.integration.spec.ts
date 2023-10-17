import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroServiceForLab } from './hero.service';  
import { Hero } from '../../hero';

describe("3-hero service (http) integration testing:", () => {
  let service: HeroServiceForLab;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroServiceForLab],
    });

    service = TestBed.inject(HeroServiceForLab);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it("getHeroes function: send request and receive response successfully", () => {
    const dummyHeroes: Hero[] = [
      { id: 1, name: 'Hero 1' },
      { id: 2, name: 'Hero 2' },
    ];

    service.getHeroes().subscribe((heroes) => {
      expect(heroes).toEqual(dummyHeroes);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/heroes');
    expect(req.request.method).toBe('GET');
    req.flush(dummyHeroes);

    httpTestingController.verify();
  });

  it("updateHero function: send request and receive response successfully", () => {
    const updatedHero: Hero = { id: 1, name: 'Updated Hero' };

    service.updateHero(updatedHero).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:3000/heroes');
    expect(req.request.method).toBe('PUT');
    req.flush({}); // You can provide a response object here

    httpTestingController.verify();
  });
});
