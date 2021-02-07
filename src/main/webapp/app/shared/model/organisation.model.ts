import { Moment } from 'moment';
import { IPersonne } from 'app/shared/model/personne.model';

export interface IOrganisation {
  id?: number;
  appellation?: string;
  description?: string;
  dateCreation?: Moment;
  personnes?: IPersonne[];
}

export class Organisation implements IOrganisation {
  constructor(
    public id?: number,
    public appellation?: string,
    public description?: string,
    public dateCreation?: Moment,
    public personnes?: IPersonne[]
  ) {}
}
