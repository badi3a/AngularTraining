import { Component, EventEmitter, Output } from '@angular/core';
import { EventsService } from '../../../shared/data/events.service';

@Component({
  selector: 'events-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  inputLocation: string = '';
  
  @Output() locationSelected = new EventEmitter<string>();
  @Output() resetFilters = new EventEmitter<void>();

  constructor(private eventService: EventsService) {}

  // Appliquer le filtre de location
  applyLocationFilter() {
    console.log('🔍 Filtrage par location:', this.inputLocation);
    // Émettre même si vide (pour afficher tout)
    this.locationSelected.emit(this.inputLocation);
  }

  // Réinitialiser tous les filtres
  reset() {
    this.inputLocation = '';
    this.resetFilters.emit();
  }
}