import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Ripley';

  constructor(private router: Router) {}
  List() {
    this.router.navigate(['list']);
  }

  Create() {
    this.router.navigate(['create']);
  }
  
  Search() {
    this.router.navigate(['search'])
  }
}
