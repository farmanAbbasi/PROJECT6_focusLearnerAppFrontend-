import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/globals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor( private formBuilder: FormBuilder,public globals: GlobalsService,public router: Router) { }
  authMessage:any;
  messageForm:FormGroup;
  submitted = false;
  success = false;
  ngOnInit() {


    this.messageForm=this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required]
    });
  }

  onSubmit(value) {
    this.submitted = true;
    if (this.messageForm.invalid) {
        return;
    }
    this.success = true;
    this.createUser(value)
}

  async createUser(value){
    var response:any=await this.globals.register(value)
    console.log(response)
    if(response.success==true){
      //loggedIn and created the user
      localStorage.setItem('token',value.email)
      this.globals.globalEmail=value.email
      this.router.navigate(['/dashboard'])
    }
    else{
      //handle error messages displaying
      this.authMessage=response.success

    }
  }
  openLogin(){
    this.globals.showLogin=true;
  }
}
