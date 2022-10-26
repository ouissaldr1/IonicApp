import { Component, OnInit } from '@angular/core';
import { FireserviceService } from '../fireservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.css'],
})
export class SignupPage implements OnInit {

  public email:any;
  public password:any;
  public name:any;
  constructor(
    public router:Router,
    public fireService:FireserviceService
    
  ) { }

  signup(){ 
    this.fireService.signup({email:this.email,password:this.password}).then(res=>{
      if(res.user.uid){
        let data = {
          email:this.email,
          password:this.password,
          name:this.name,
          uid:res.user.uid
        }
        this.fireService.saveDetails(data).then(res=>{
         alert('Account Created!');
         this.router.navigateByUrl('home');
        },err=>{
          console.log(err);
        })
      }
    },err=>{
      alert(err.message);

      console.log(err);
    })
  }
  ngOnInit() {
  }

}
