import { Component, OnInit, OnDestroy } from '@angular/core';
import { Eventy } from '../../../models/eventy';
import { DataEventsService } from '../../../shared/services/data-events.service';
import { FilterService } from '../../../shared/services/filter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrl: './list-event.component.css',
})
export class ListEventComponent implements OnInit, OnDestroy {
  list: Eventy[] = [];
  searchTerm: string = '';
  selectedLocation: string = '';
  private filterSubscription: Subscription;
  private eventsSubscription: Subscription;
  minPrice: number | null = null;
maxPrice: number | null = null;
availabilityFilter: string = 'all';
dateFilter: string = 'all';
organizerId: number | null = null;


  constructor(
    private dataService: DataEventsService,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    // S'abonner à l'Observable retourné par le service
    this.eventsSubscription = this.dataService.getAllEvents().subscribe({
      next: (events) => {
        this.list = events;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
        this.list = [];
      }
    });
    this.filterSubscription = this.filterService.filters$.subscribe(filters => {
  this.searchTerm = filters.searchText;
  this.selectedLocation = filters.selectedLocation;
  this.minPrice = filters.minPrice;
  this.maxPrice = filters.maxPrice;
  this.dateFilter = filters.dateFilter;
  this.availabilityFilter = filters.availabilityFilter;
  this.organizerId = filters.organizerId;
});

  }

  ngOnDestroy() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }

  get filteredList(): Eventy[] {
  return this.list.filter(event => {
    // Filtre par titre
    const matchTitle = !this.searchTerm || event.title.toLowerCase().includes(this.searchTerm.toLowerCase());

    // Filtre par lieu
    const matchLocation = !this.selectedLocation || event.location === this.selectedLocation;

    // Filtre par prix
    const matchMinPrice = !this.minPrice || event.price >= this.minPrice;
    const matchMaxPrice = !this.maxPrice || event.price <= this.maxPrice;

    // Filtre par disponibilité
    const matchAvailability =
      !this.availabilityFilter ||
      this.availabilityFilter === 'all' ||
      (this.availabilityFilter === 'available' && event.nbrPlaces > 0) ||
      (this.availabilityFilter === 'full' && event.nbrPlaces === 0);


    // Filtre par organisateur
    const matchOrganizer = !this.organizerId || event.organizerId === this.organizerId;

    return matchTitle && matchLocation && matchMinPrice && matchMaxPrice &&
           matchAvailability  && matchOrganizer;
  });
}


  likeEvent(event: Eventy) {
  event.nbrLikes++;
  this.dataService.updateEvent(event.id, event).subscribe(() => {
  });
  }


onDelete(eventToDelete: Eventy) {
  if (confirm(`Voulez-vous vraiment supprimer l'événement "${eventToDelete.title}" ?`)) {
    this.dataService.deleteEvent(eventToDelete.id).subscribe(() => {
      // Supprime l'événement de la liste locale
      this.list = this.list.filter(e => e.id !== eventToDelete.id);
    });
  }
}

}