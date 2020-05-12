import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';
import {AuthService} from '../../services/auth.service';
import {URLs} from '../../dictionary';

@Component({
  selector: 'app-auth-main',
  templateUrl: './auth-main.component.html',
  styleUrls: ['./auth-main.component.css']
})
export class AuthMainComponent implements OnInit {
  google = faGoogle;
  facebook = faFacebook;
  hide = true;
  url: string;
  name: string;
  email: string;
  password: string;
  password2: string;

  constructor(private sharedService: SharedService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.sharedService.url$.subscribe(url => this.url = url);
    console.log(this.url);
  }

  signUp() {
    if (this.password === this.password2) {
      this.authService.SignUp(this.email, this.password);
    }
  }

  signIn() {
    this.authService.SignIn(this.email, this.password);
  }

  sign() {
    this.url === URLs.LOGIN ? this.signIn() : this.signUp();
    this.email = '';
    this.password = '';
    this.password2 = '';
  }

}
