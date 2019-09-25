import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  registerErrorMsg: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.authService.login(this.model).subscribe(next => {
        this.router.navigate(["/boards"]);
        this.authService.errorMsg = null;
      });
    }, error => {
      this.registerErrorMsg = error.error;
      console.log(error);
    });
  }
}
