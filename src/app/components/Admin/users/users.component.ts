import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  name: string;
  username: string;
  password: string;
  rPassword: string;
  errorBox: boolean;
  passwordBox: boolean;
  users: User[]; 
  user: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.errorBox == false;
    this.passwordBox == false;
    this. user = this.userService.loadUser();
    this.getUsers();
  }

  isSet(){
    if(this.name && this.username && this.password && this.rPassword){
      return true;
    }
    else{
      this.errorBox = true;
      setTimeout(()=> {this.errorBox = false}, 2000 )
      return false;
    } 
  }

  isPasswords(){
    if(this.password === this.rPassword){
      return true;
    }
    else{
      this.passwordBox = true;
      setTimeout(()=> {this.passwordBox = false}, 2000 )
      return false;
    }
  }

  register(){
    if(this.isSet() && this.isPasswords()){
      var user = {
        name: this.name,
        username: this.username,
        _id: '1'
      }
      this.userService.registerUser(this.name, this.username, this.password).subscribe();
      this.users.push(user);
    }
  }

  getUsers(){
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
        this.users = this.users.filter(item => item._id !== this.user.id);
      }
    )
  }

  delete(id){
    this.userService.deleteUser(id).subscribe();
    this.users = this.users.filter(item => item._id !== id);
  }

}
