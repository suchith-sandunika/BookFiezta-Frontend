import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SessionService} from './services/session/session.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'client';
}
