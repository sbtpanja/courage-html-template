import { AfterViewInit, Component, OnInit } from '@angular/core';
declare var $: any
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

    $("#header").sticky({
      topSpacing: 0,
      zIndex: '50'
    });
    $('.nav-menu').superfish({
      animation: {
        opacity: 'show'
      },
      speed: 400
    });

    if ($('#nav-menu-container').length) {
      var $mobile_nav = $('#nav-menu-container').clone().prop({
        id: 'mobile-nav'
      });
      $mobile_nav.find('> ul').attr({
        'class': '',
        'id': ''
      });
      $('body').append($mobile_nav);
      $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
      $('body').append('<div id="mobile-body-overly"></div>');
      $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

      $(document).on('click', '.menu-has-children i', function (e: Event) {
        $(e.target).next().toggleClass('menu-item-active');
        $(e.target).nextAll('ul').eq(0).slideToggle();
        $(e.target).toggleClass("fa-chevron-up fa-chevron-down");
      });

      $(document).on('click', '#mobile-nav-toggle', function (e: Event) {
        $('body').toggleClass('mobile-nav-active');
        $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
        $('#mobile-body-overly').toggle();
      });

      $(document).click(function (e: Event) {
        var container = $("#mobile-nav, #mobile-nav-toggle");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').fadeOut();
          }
        }
      });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
      $("#mobile-nav, #mobile-nav-toggle").hide();
    }


    $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function (e: Event) {
      var ee = e.target as any;
      if (location.pathname.replace(/^\//, '') == ee.pathname.replace(/^\//, '') && location.hostname == ee.hostname) {
        var target = $(ee.hash);
        if (target.length) {
          var top_space = 0;

          if ($('#header').length) {
            top_space = $('#header').outerHeight();

            if (!$('#header').hasClass('header-fixed')) {
              top_space = top_space - 20;
            }
          }

          $('html, body').animate({
            scrollTop: target.offset().top - top_space
          }, 1500, 'easeInOutExpo');

          if ($(ee).parents('.nav-menu').length) {
            $('.nav-menu .menu-active').removeClass('menu-active');
            $(ee).closest('li').addClass('menu-active');
          }

          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').fadeOut();
          }
          //return false;
        }
      }
    });


  }
}
