import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogsComponent } from './blogs/blogs.component';
import { NutritionComponent } from './nutrition/nutrition.component';
import { ContactComponent } from './contact/contact.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { Blog1Component } from './blog1/blog1.component';
import { Blog2Component } from './blog2/blog2.component';
import { Blog3Component } from './blog3/blog3.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', title: 'Home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home', pathMatch: 'full' },
  {
    path: 'blogs',
    component: BlogsComponent,
    title: 'Blogs',
    pathMatch: 'full',
  },
  {
    path: 'nutrition',
    component: NutritionComponent,
    title: 'Nutrition',
    pathMatch: 'full',
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact',
    pathMatch: 'full',
  },
  {
    path: 'thankyou',
    component: ThankyouComponent,
    title: 'Thank You',
  },
  {
    path: 'blog1',
    component: Blog1Component,
    title: 'Going to the gym for the first time',
  },
  {
    path: 'blog2',
    component: Blog2Component,
    title: 'How to Burn More Calories on a Treadmill Efficiently',
  },
  {
    path: 'blog3',
    component: Blog3Component,
    title: 'How to Properly Breathe During Heavy Powerlifting Lifts',
  },
  {
    path: '**',
    component: NotfoundComponent,
    title: 'Not Found',
  },
];
