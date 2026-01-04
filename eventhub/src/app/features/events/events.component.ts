import { Component } from '@angular/core';
import { FilterService } from '../../shared/services/filter.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  
  constructor(private filterService: FilterService) {}

  onFilterChanged(filters: any) {
    this.filterService.updateFilters({
      searchText: filters.search || '',
      selectedLocation: filters.location || '',
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      dateFilter: filters.dateFilter || 'all',
      availabilityFilter: filters.availabilityFilter || 'all',
      organizerId: filters.organizerId
    });
  }
}