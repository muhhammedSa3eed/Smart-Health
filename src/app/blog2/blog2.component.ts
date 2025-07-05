import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-blog2',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './blog2.component.html',
  styleUrl: './blog2.component.css',
})
export class Blog2Component implements OnInit {
  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
