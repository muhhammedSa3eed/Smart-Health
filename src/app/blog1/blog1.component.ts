import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-blog1',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './blog1.component.html',
  styleUrl: './blog1.component.css',
})
export class Blog1Component implements OnInit {
  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
