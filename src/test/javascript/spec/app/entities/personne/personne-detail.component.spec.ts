import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SandboxTestModule } from '../../../test.module';
import { PersonneDetailComponent } from 'app/entities/personne/personne-detail.component';
import { Personne } from 'app/shared/model/personne.model';

describe('Component Tests', () => {
  describe('Personne Management Detail Component', () => {
    let comp: PersonneDetailComponent;
    let fixture: ComponentFixture<PersonneDetailComponent>;
    const route = ({ data: of({ personne: new Personne(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SandboxTestModule],
        declarations: [PersonneDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PersonneDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PersonneDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load personne on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.personne).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
