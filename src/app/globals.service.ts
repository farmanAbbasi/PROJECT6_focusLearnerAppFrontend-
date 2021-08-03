import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  showLogin=true; 
  //global variables 
  globalEmail="";
  courseInCart="";
  coursePrice="";
  openPaymentPage=false;
  paymentDone=false;
  boughtCourses=[]

  constructor(public http: HttpClient) { }
  register(postData){
    const url="http://localhost:3000/api/customers/register"
    return this.http.post(url,postData).toPromise();  
  }

  login(postData){
    const url="http://localhost:3000/api/customers/login"
    return this.http.post(url,postData).toPromise();  
  }
  updateCourses(email,course_name){
    var postData={"email":email,"course_name":course_name}
    const url="http://localhost:3000/api/customers/update"
    return this.http.post(url,postData).toPromise();  

  }

  fetchGet(url){
    return this.http.get(url).toPromise();  

  }
}
