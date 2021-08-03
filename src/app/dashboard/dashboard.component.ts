import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  coursesList=[];
  authMessage=""
  constructor(public router:Router,public globals: GlobalsService) { }

  async ngOnInit() {
    this.getCoursesList()
    var response:any=await this.globals.updateCourses(this.globals.globalEmail,this.globals.courseInCart)
      console.log(response)
      this.globals.boughtCourses=response.coursesid
  }

  async getCoursesList(){
    let courses_url="https://s3-ap-southeast-1.amazonaws.com/he-public-data/courses26269ff.json"
    let response:any=await this.globals.fetchGet(courses_url)
    this.coursesList=response
    console.log(this.coursesList)
  }

  logout(){
      localStorage.removeItem('token')
      this.router.navigate(['login']);

  }

  getClasses(pricing) {
    let myClasses = {
      red: pricing < 300,
      green: pricing > 3000,
      blue: pricing >= 300 && pricing <= 3000
    }
    return myClasses

  }
  
 async buyCourse(course_title,course_price){
  if(confirm("Successfully added to your basket: "+course_title)) {
    this.globals.courseInCart=course_title
    this.globals.coursePrice=course_price
    this.globals.openPaymentPage=true
   
}
}

gotoHome(){
  this.globals.openPaymentPage=false
}
getClasses2(title){
  
var myClasses
  if(this.globals.boughtCourses.indexOf(title)!=-1){
     myClasses = {enabled:true}
  }
  else{
       myClasses = {disabled:true}
    }
    return myClasses
  }
}



