import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { QuotesearchComponent } from './quotesearch/quotesearch.component';
import { MarketperformanceComponent } from './marketperformance/marketperformance.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const appRoutes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'about', component: AboutComponent},
  { path: 'quotesearch', component: QuotesearchComponent},
  { path: 'marketperformance', component: MarketperformanceComponent},
  { path: 'login', component: LoginComponent},
  { path: 'sign_up', component: SignUpComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    PageNotFoundComponent,
    AboutComponent,
    QuotesearchComponent,
    MarketperformanceComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } //Debugging purposes only
    ),
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
