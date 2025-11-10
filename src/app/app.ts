import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Shell } from "./core/layout/shell/shell";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Shell],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
