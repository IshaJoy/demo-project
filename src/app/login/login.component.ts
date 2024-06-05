import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  description:any="Please fill the following"
  styles:string="fw-bolder text-danger"
  login_img:any="https://atharvapublications.com/assets/image/login.png"
  username:string=""
  pswd:string=""
// Dependency Injection
  constructor(private loginRouter:Router,private ds:DataService){

  }

  getUsername(event:any){
    console.log(event.target.value);
    this.username = event.target.value
    
  }

  login(pswd:any){
    if (this.username) {
      this.ds.loginUsername = this.username
    }
    console.log(pswd.value);
    alert(`Username: ${this.username}, Password: ${pswd.value}`)
      // navigate to dashboard
    this.loginRouter.navigateByUrl('dashboard')
    
   
    
   
    
  }
}
