import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent implements OnInit {
  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]); // التمرير إلى الأعلى عند التهيئة
  }
}
