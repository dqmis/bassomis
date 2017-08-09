import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
   user: object;

  constructor(private userService: UserService, private router: Router) { }


  ngOnInit() {
    this.getUser();
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['/login']);
    return false;
  }

  getUser(){
    this.user = this.userService.loadUser();
  }

}
