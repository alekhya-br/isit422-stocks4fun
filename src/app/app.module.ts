import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';

const appRoutes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
]

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } //Debugging purposes only
    ),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
