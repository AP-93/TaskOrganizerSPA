import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  model: any = {};
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log("gg logirase");
      this.router.navigate(["/boards"]);
      this.authService.errorMsg = null;
    }, error => {
      console.log("login fail", error);
      this.authService.errorMsg = error.error;
      console.log(this.authService.errorMsg);
    });
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(["/home"]);
    this.authService.errorMsg = null;
    console.log("logged out");
  }
}
