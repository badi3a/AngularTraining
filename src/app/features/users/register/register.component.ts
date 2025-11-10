import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  user: User;
  formRegister: FormGroup;
  constructor() {
  }
  ngOnInit() {
    this.user = new User();
    this.formRegister = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      //todo 0=> pattern for email => a..z"@"a..z"."a..z & password => 8 char => aA1@
      email: new FormControl('', [Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
      ]),
            password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]),
  // todo 1=> work on address
        address: new FormGroup({
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        zip: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{4,6}$')])
          
      }),
//todo 2=> work on the list of phone numbers
            phones: new FormArray([
        new FormControl('', [Validators.required,])
      ])

    })
  }


    get phones(): FormArray {
    return this.formRegister.get('phones') as FormArray;
  }

  addPhone() {
    this.phones.push(new FormControl('', [Validators.required,]));
  }

  save(){
    this.user=this.formRegister.getRawValue();
    console.log(this.user);
    //service to persist the object => save
    //

  }
  //todo 0=> pattern for email => a..z"@"a..z"."a..z & password => 8 char => aA1@
  // todo 1=> work on address: {
  //     street: string;
  //     city: string;
  //     state: string;
  //     zip: string;
  //   }
  //todo 2=> work on the list of phone numbers => dynamic list +1 number
}
