import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface EventFilters {
  searchText: string;
  selectedLocation: string;
  minPrice: number | null;
  maxPrice: number | null;
  dateFilter: string; // 'all', 'upcoming', 'thisWeek', 'thisMonth'
  availabilityFilter: string; // 'all', 'available', 'full'
  organizerId: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filtersSubject = new BehaviorSubject<EventFilters>({
    searchText: '',
    selectedLocation: '',
    minPrice: null,
    maxPrice: null,
    dateFilter: 'all',
    availabilityFilter: 'all',
    organizerId: null
  });

  filters$ = this.filtersSubject.asObservable();

  updateFilters(filters: EventFilters) {
    this.filtersSubject.next(filters);
  }

  resetFilters() {
    this.filtersSubject.next({
      searchText: '',
      selectedLocation: '',
      minPrice: null,
      maxPrice: null,
      dateFilter: 'all',
      availabilityFilter: 'all',
      organizerId: null
    });
  }
}