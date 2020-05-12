import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';

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
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.url$.subscribe(url => this.url = url);
    console.log(this.url);
  }

}
