// We use "export" so that this interface can be imported and reused
//    in other components, services, or modules of the application.
export class Eventy {
  id: number;              // Unique identifier of the event
  title: string;           // Event title
  description: string;     // Event description
  date: Date;              // Event date
  location: string;            // Location
  price: number;            // Ticket price
  organizerId: number;  // Organizer identifier
  imageUrl: string;        // Path/URL to the event image
  nbPlaces: number;        // Number of available places
  nbrLike: number;         // Number of likes
}
