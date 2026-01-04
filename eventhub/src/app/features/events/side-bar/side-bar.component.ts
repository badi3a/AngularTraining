import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'events-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  searchText: string = '';
  selectedLocation: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  dateFilter: string = 'all';
  availabilityFilter: string = 'all';
  organizerId: number | null = null;

  @Output() filterChanged = new EventEmitter<any>();

  applyFilter() {
    this.filterChanged.emit({
      search: this.searchText,
      location: this.selectedLocation,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      dateFilter: this.dateFilter,
      availabilityFilter: this.availabilityFilter,
      organizerId: this.organizerId
    });
  }

  resetFilters() {
    this.searchText = '';
    this.selectedLocation = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.dateFilter = 'all';
    this.availabilityFilter = 'all';
    this.organizerId = null;
    this.applyFilter();
  }
}