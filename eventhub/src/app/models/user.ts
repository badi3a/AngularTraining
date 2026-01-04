import {Eventy} from './eventy';
import {Ticket} from './ticket';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  }
  phones: string[];
  events: Eventy[];
  tickets: Ticket[];
}
