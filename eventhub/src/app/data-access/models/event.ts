// We use "export" so that this interface can be imported and reused
//    in other components, services, or modules of the application.
export interface Eventy {
  // We use "interface" instead of "class" here because:
  //    - It defines only the *shape* (structure) of the data.
  //    - It does not generate JavaScript code (lighter).
  //    - It is perfect for describing data models coming from an API or static data.
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
