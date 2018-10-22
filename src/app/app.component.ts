import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'isit422-stocks4fun';
}

(function($) {
  $(function() {
    $('nav ul li > a:not(:only-child)').click(function(e) {
      $(this).siblings('.nav-dropdown').toggle();
      $('.nav-dropdown').not($(this).siblings()).hide();
      e.stopPropagation();
    });
      $('html').click(function() {
        $('.nav-dropdown').hide();
    });
    $('#nav-toggle').on('click', function() {
      this.classList.toggle('active');
    });
    $('#nav-toggle').click(function() {
      $('nav ul').toggle();
    });
  });
})(jQuery);