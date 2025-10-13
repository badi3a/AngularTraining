export interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  location: string;
  price: number;
  organizerId: number;
  imageUrl: string;
  nbPlaces: number;
  nbrLike: number;
  // Ajouter les propriétés manquantes
  nbrDislike?: number;
  animateLike?: boolean;
  animateDislike?: boolean;
}
