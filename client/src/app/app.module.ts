import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AuthGuard } from './core/auth.guard';
import { UserResolver } from './user/user.resolver';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { QuotesearchComponent } from './quotesearch/quotesearch.component';
import { BuystocksComponent } from './buystocks/buystocks.component';
import { MarketperformanceComponent } from './marketperformance/marketperformance.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserComponent } from './user/user.component';
import { UserService } from './core/user.service';
import { AuthService } from './core/auth.service';

const appRoutes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'quotesearch', component: QuotesearchComponent},
  { path: 'buystocks', component: BuystocksComponent, resolve: { data: UserResolver }},
  { path: 'marketperformance', component: MarketperformanceComponent},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: SignUpComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, resolve: { data: UserResolver }},
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
    QuotesearchComponent,
    MarketperformanceComponent,
    LoginComponent,
    SignUpComponent,
    UserComponent,
    BuystocksComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } //Debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [AuthGuard, UserService, AuthService, UserResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
