import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { GlobalsService } from '../globals.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import swal from 'sweetalert';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;
  showOTPBOX=false;

  constructor(public globals: GlobalsService,private formBuilder: FormBuilder,public router:Router) { }

  ngOnInit() {
    this.messageForm=this.formBuilder.group({
      name: ['',Validators.required],
      cvv: ['', Validators.required],
      expiryDate: ['',Validators.required],
      cardNumber:['',Validators.required],
      otp:['']
    });
    if(this.globals.globalEmail==""){
      this.globals.globalEmail=localStorage.getItem('token')
    }


  }



  async onSubmit(val) {
    this.submitted = true;
    if (this.messageForm.invalid) {
        return;
    }
    this.success = true;
    console.log(val)
    this.showOTPBOX=true
    if(val.otp=="123456"){
      this.globals.openPaymentPage=false;
      // swal("Completed!", "Payment successfully!", "success");
      this.globals.paymentDone=true;
      var response:any=await this.globals.updateCourses(this.globals.globalEmail,this.globals.courseInCart)
      console.log(response)
      this.globals.boughtCourses=response.coursesid

    }
    else if(val.otp!==""){
      // swal("Oops!", "Wrong OTP!!!", "error");

    }

}
}
