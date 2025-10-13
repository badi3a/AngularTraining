import { Injectable } from '@angular/core';
import { Event } from '../../app/models/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private events: Event[] = [
    {
      id: 1,
      title: "Tournoi LoL Inter-Classes",
      description: "Tournoi de League of Legends entre les différentes classes. Inscriptions ouvertes à tous les étudiants. Prix pour les trois premières équipes et récompenses spéciales pour les MVP.",
      date: new Date('2024-12-15'),
      location: "Labo Informatique B",
      price: 0,
      organizerId: 1,
      imageUrl: "/assets/images/lol-tournament.jpg",
      nbPlaces: 32,
      nbrLike: 0,
      nbrDislike: 0
    },
    {
      id: 2,
      title: "Workshop Valorant",
      description: "Session d'entraînement et stratégies avancées avec nos joueurs expérimentés. Apprenez les techniques de tir, les positions et les stratégies d'équipe pour améliorer votre gameplay.",
      date: new Date('2024-12-22'),
      location: "Salle Gaming",
      price: 0,
      organizerId: 1,
      imageUrl: "/assets/images/valorant-workshop.jpg",
      nbPlaces: 20,
      nbrLike: 0,
      nbrDislike: 0
    },
    {
      id: 3,
      title: "LAN Party CS2 & Valorant",
      description: "Une soirée gaming complète avec tournois CS2 et Valorant. Nourriture et boissons fournies. Apportez votre setup ou utilisez nos PC gaming.",
      date: new Date('2025-01-12'),
      location: "Amphithéâtre Principal",
      price: 0,
      organizerId: 1,
      imageUrl: "/assets/images/lan-party.jpg",
      nbPlaces: 50,
      nbrLike: 0,
      nbrDislike: 0
    }
  ];

  constructor() { }

  getAllEvents(): Event[] {
    return this.events;
  }

  getEventById(id: number): Event | undefined {
    return this.events.find(event => event.id === id);
  }
}
