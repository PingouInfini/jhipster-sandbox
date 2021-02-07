import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PersonneService } from 'app/entities/personne/personne.service';
import { IPersonne, Personne } from 'app/shared/model/personne.model';
import { Couleur } from 'app/shared/model/enumerations/couleur.model';

describe('Service Tests', () => {
  describe('Personne Service', () => {
    let injector: TestBed;
    let service: PersonneService;
    let httpMock: HttpTestingController;
    let elemDefault: IPersonne;
    let expectedResult: IPersonne | IPersonne[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PersonneService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Personne(0, 'AAAAAAA', 'AAAAAAA', currentDate, 0, Couleur.BLEU);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateDeNaissance: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Personne', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateDeNaissance: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDeNaissance: currentDate,
          },
          returnedFromService
        );

        service.create(new Personne()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Personne', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            prenom: 'BBBBBB',
            dateDeNaissance: currentDate.format(DATE_TIME_FORMAT),
            taille: 1,
            couleurYeux: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDeNaissance: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Personne', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            prenom: 'BBBBBB',
            dateDeNaissance: currentDate.format(DATE_TIME_FORMAT),
            taille: 1,
            couleurYeux: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDeNaissance: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Personne', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
