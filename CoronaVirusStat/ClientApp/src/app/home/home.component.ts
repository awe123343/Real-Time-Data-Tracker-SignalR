import { Component } from '@angular/core';
import { AnimationRoute } from '../animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [AnimationRoute]
})
export class HomeComponent {
}
