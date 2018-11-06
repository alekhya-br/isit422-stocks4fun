import { Component } from '@angular/core';
import * as $ from 'jquery';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { AuthService } from './core/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'isit422-stocks4fun';
  public user: firebase.User;

  constructor(
    public authService: AuthService,
    private location: Location
  ) { }

  checkUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        console.log('logged in', user);
      } else {
        console.log('not logged in');
      }
    });
  }

  logout() {
    this.authService.doLogout()
      .then(res => {
        console.log(res);
      }, err => console.log(err))
  }
}

(function ($) {
  $(function () {
    $('nav ul li > a:not(:only-child)').click(function (e) {
      $(this).siblings('.nav-dropdown').toggle();
      $('.nav-dropdown').not($(this).siblings()).hide();
      e.stopPropagation();
    });
    $('html').click(function () {
      $('.nav-dropdown').hide();
    });
    $('#nav-toggle').on('click', function () {
      this.classList.toggle('active');
    });
    $('#nav-toggle').click(function () {
      $('nav ul').toggle();
    });
  });
})(jQuery);