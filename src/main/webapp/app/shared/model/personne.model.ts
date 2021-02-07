import { Moment } from 'moment';
import { IOrganisation } from 'app/shared/model/organisation.model';
import { Couleur } from 'app/shared/model/enumerations/couleur.model';

export interface IPersonne {
  id?: number;
  nom?: string;
  prenom?: string;
  dateDeNaissance?: Moment;
  taille?: number;
  couleurYeux?: Couleur;
  organisations?: IOrganisation[];
}

export class Personne implements IPersonne {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public dateDeNaissance?: Moment,
    public taille?: number,
    public couleurYeux?: Couleur,
    public organisations?: IOrganisation[]
  ) {}
}
