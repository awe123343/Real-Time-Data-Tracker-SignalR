import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimationRoute } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [AnimationRoute]
})
export class AppComponent {
  title = 'app';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
