import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private UserService: UserService, private router: Router){

    }

    canActivate(){
        if(this.UserService.loggedIn()){
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}