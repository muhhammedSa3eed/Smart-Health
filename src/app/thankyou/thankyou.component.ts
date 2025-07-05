import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './thankyou.component.html',
  styleUrl: './thankyou.component.css',
})
export class ThankyouComponent implements OnInit {
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
