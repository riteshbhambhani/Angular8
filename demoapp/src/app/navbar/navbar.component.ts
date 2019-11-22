import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../model/appUsers';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public appUser: AppUser;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.appUser$.subscribe(recUser=> 
      {this.appUser = recUser});
   }  

  googleLogout(){
    this.authService.logout().then(() => {
      this.appUser = null;
      this.router.navigate(['login']);
    });;
  }
  
}
