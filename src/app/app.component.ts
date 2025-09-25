import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClaimformComponent } from './Components/claimform/claimform.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ClaimformComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ClaimForm';
}
