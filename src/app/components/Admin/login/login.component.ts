import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  errorBox: boolean;
  message: string;
  loginBox: boolean;

  constructor(private userServices: UserService, private router: Router) { }

  ngOnInit() {
    this.errorBox = false;
    this.loginBox = false;
  }

  isSet(){
    if(this.username && this.password){
      return true;
    }
    else{
      this.errorBox = true;
      this.message = 'Užpildykite visus laukelius'
      setTimeout(()=> {this.errorBox = false}, 3000 )
      return false;
    }
  }

  login(){
    if(this.isSet()){
      const user = {
        username: this.username,
        password: this.password
      }

      this.userServices.authenticateUser(user).subscribe(data => {
        if(data.success){

          this.userServices.storeUserData(data.token, data.user);
          this.message = 'Sėkmingai prisijungėte';

          this.errorBox = false;
          this.loginBox = true;
          setTimeout(()=> {this.router.navigate(['/admin'])}, 2000 )
        }
        else {
          this.errorBox = true;
          this.message = data.msg
          setTimeout(()=> {this.errorBox = false}, 3000 )
        }
      })
    }
  }

}
