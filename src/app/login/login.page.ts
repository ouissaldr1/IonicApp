import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FireserviceService } from '../fireservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage implements OnInit {
  public email:any;
  public password:any;
  constructor(
    public router:Router,
    public fireService:FireserviceService
  ) { 
    
  }

  ngOnInit() {
  }
  // signOut() {
  //   this.auth.signOut().then(() => {
  //     location.reload
  //   });
  //}
  login(){
    this.fireService.loginWithEmail({email:this.email,password:this.password}).then(res=>{
      console.log(res);
      if(res.user.uid){
        this.fireService.getDetails({uid:res.user.uid}).subscribe(res=>{
          console.log(res);
          alert('Welcome '+ res['name']);
          this.router.navigateByUrl('home')
        },err=>{
          console.log(err);
        });
      }
    },err=>{
      alert(err.message)
      console.log(err);
    })
  }


  signup(){
    this.router.navigateByUrl('signup');
  }
}
