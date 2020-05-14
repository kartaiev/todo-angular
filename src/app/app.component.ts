import {Component, OnInit} from '@angular/core';
import {Event, Router, RouterEvent} from '@angular/router';
import {SharedService} from './services/shared.service';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'todo';

  constructor(
    private router: Router,
    private sharedService: SharedService,
  ) {
    router.events
      .subscribe((event: Event) => {
        if (!(event instanceof RouterEvent) || event.url) {
          if (event instanceof RouterEvent) {
            this.sharedService.setUrl(event.url);
            console.log(event.url);
          }
        }
      });
  }

  ngOnInit(): void {
  }
}

