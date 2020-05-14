import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  template: `
      <div class="ui container">

          <h1>Home</h1>

          <p>Das ist der KWM GEGEN CORONA Store</p>

      </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
