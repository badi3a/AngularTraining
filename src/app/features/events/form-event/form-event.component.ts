import { Component } from '@angular/core';
import { Eventy } from '../../../models/eventy';
import {DataEventsService} from '../../../shared/services/data-events.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrl: './form-event.component.css',
})
export class FormEventComponent {
  today = new Date().toISOString().split('T')[0];
  event: Eventy = new Eventy();
  constructor(private service:DataEventsService, private router:Router) {
  }
  save() {
    this.service.addEvent(this.event);
    this.router.navigate(['events']);
  }
}
