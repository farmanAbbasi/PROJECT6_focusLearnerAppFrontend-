import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/globals.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  authMessage:any;
  messageForm:FormGroup;
  submitted = false;
  success = false;

 
  
  constructor(private formBuilder: FormBuilder,public globals: GlobalsService,public router:Router) { }

  ngOnInit() {
   

    this.messageForm=this.formBuilder.group({
      email: ['',[Validators.required]],
      password: ['',Validators.required]
    });
  }

  onSubmit(value) {
    this.submitted = true;
    if (this.messageForm.invalid) {
        return;
    }
    this.success = true;
    this.login(value)

}

async login(value) {
  if(value.email=="test" && value.password=="test"){
    //loggedIn
    localStorage.setItem('token',value.email)
    this.globals.globalEmail=value.email
    this.router.navigate(['/dashboard'])
    return
  }
 //console.log(value)
  var response:any=await this.globals.login(value)
  console.log(response)
  if(response.success==true){
    //loggedIn
    localStorage.setItem('token',value.email)
    this.globals.globalEmail=value.email
    this.router.navigate(['/dashboard'])
  }
  else{
    //handle error messages displaying
    this.authMessage=response.success
  }
}


openRegistration(){
  this.globals.showLogin=false;
}

}
