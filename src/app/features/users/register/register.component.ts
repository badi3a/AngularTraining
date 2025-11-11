import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  gForm: FormGroup;
  constructor() {
    }
    ngOnInit() {
    this.gForm = new FormGroup({
      firstName: new FormControl('',
                    [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('',
                    [Validators.required, Validators.minLength(3)]),
      email: new FormControl('',
        [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),Validators.minLength(8)]),
      address: new FormGroup({
        street: new FormControl('',[Validators.required, Validators.minLength(3)]),
        city: new FormControl('',[Validators.required, Validators.minLength(3)]),
        state: new FormControl('',[Validators.required, Validators.minLength(3)]),
        zip: new FormControl('',[Validators.required, Validators.minLength(4)]),
      })
    })
    }
  //1- pattern for the password a..zA..Z@&0..9 (8 charact)
  //2-add the address ()
  //3-phones[]

    save(){
    let user=this.gForm.getRawValue();
    //user push service => backend
      console.log(user)
    }
}
