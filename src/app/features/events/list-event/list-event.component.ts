import {Component, OnInit} from '@angular/core';
import {Eventy} from '../../../models/eventy';
import {EventsService} from '../../../shared/data/events.service';
import { LoginService } from '../../../shared/data/login.service';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrl: './list-event.component.css',
})
export class ListEventComponent implements OnInit {
  userRole: string = '';
  title: string;
  listEvents: Eventy[] = [];           // Liste affichée (filtrée)
  allEvents: Eventy[] = [];            // Liste complète (backup)
  searchValue: string = '';
  selectedLocation: string = '';       // Location sélectionnée depuis la sidebar

  constructor(private eventService: EventsService, private login: LoginService) {}

  ngOnInit() {
    this.loadAllEvents();
  }

  // Charger tous les événements
  loadAllEvents() {
    this.eventService.getAllEvents().subscribe(data => {
      this.allEvents = data;
      this.listEvents = [...data];  // Copie de la liste complète
    });
  }

  // Recherche par titre (temps réel avec ngModel)
  search() {
    this.applyFilters();
  }

  // Filtrer par location (appelé depuis sidebar)
  filterByLocation(location: string) {
    console.log('📍 Location reçue:', location);
    this.selectedLocation = location;
    this.applyFilters();
  }

  // Appliquer tous les filtres combinés
  applyFilters() {
    console.log('🔄 Application des filtres - Search:', this.searchValue, 'Location:', this.selectedLocation);
    let filtered = [...this.allEvents];

    // Filtre par recherche (titre)
    if (this.searchValue && this.searchValue.trim() !== '') {
      const search = this.searchValue.toLowerCase().trim();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(search)
      );
      console.log('Après filtre titre:', filtered.length);
    }

    // Filtre par location
    if (this.selectedLocation && this.selectedLocation !== '') {
      filtered = filtered.filter(event =>
        event.location.toUpperCase() === this.selectedLocation.toUpperCase()
      );
      console.log('Après filtre location:', filtered.length);
    }

    this.listEvents = filtered;
    console.log('✅ Résultats finaux:', this.listEvents.length);
  }

  // Réinitialiser tous les filtres
  resetFilters() {
    this.searchValue = '';
    this.selectedLocation = '';
    this.listEvents = [...this.allEvents];
  }

  nbrLike(e: Eventy) {
    e.nblikes++;
    this.eventService.updateEvent(e.id, e).subscribe();
  }

  isAdmin(): boolean {
    return this.login.isAdmin();
  }
}