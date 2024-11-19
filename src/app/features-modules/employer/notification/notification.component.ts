import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  public routes = routes

}
