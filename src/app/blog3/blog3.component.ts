import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-blog3',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './blog3.component.html',
  styleUrl: './blog3.component.css',
})
export class Blog3Component implements OnInit {
  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
