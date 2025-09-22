export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;       // ISO format: '2025-10-01'
  location: string;
  price: number;
  availablePlaces: number;
  imageUrl: string;
  likes: number;
}
