import { Component } from '@angular/core';
import {Eventy} from '../../../models/eventy';

@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrl: './form-event.component.css'
})
export class FormEventComponent {
  event= new Eventy()
  save(){
    //save => service
    console.log(this.event);
  }
}
