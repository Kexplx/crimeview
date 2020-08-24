import { Component } from '@angular/core';
import { RouteService } from '../route.service';

@Component({
  selector: 'app-route-overview',
  templateUrl: './route-overview.component.html',
  styleUrls: ['./route-overview.component.scss'],
})
export class RouteOverviewComponent {
  route$ = this.routeService.route$;

  constructor(private routeService: RouteService) {}
}
