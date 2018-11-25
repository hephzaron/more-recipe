import jQuery from './jquery';

jQuery(document).ready(($) => {
  /** Multi-Toggle Navigation**/
  $(() => {
    $('body').addClass('js');
    const $menu = $('#menu'),
      $menulink = $('.menu-link'),
      $notification = $('.notification'),
      $notifications = $('#notifications'),
      $menuTrigger = $('.has-subnav');
    $menulink.on("click", (e) => {
      e.preventDefault();
      $menulink.toggleClass('active');
      $menu.toggleClass('active');
    });

    $menuTrigger.on("click", (e) => {
      e.preventDefault();
      $menuTrigger.toggleClass('active').next('ul').toggleClass('active');
    });

    $notification.on("click", (e) => {
      e.preventDefault();
      $notifications.toggleClass('hidden');
    });
  });
  //***************************
  // BannerOne Functions
  //***************************
  jQuery('.wawrecipe-banner').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    dots: false,
    arrows: false,
    fade: true,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  //***************************
  // BannerOne Functions
  //***************************
  jQuery('.wawrecipe-testimonial').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    dots: true,
    prevArrow: "<span class='slick-arrow-left'><i class='icon wawrecipe-arrows32'></i></span>",
    nextArrow: "<span class='slick-arrow-right'><i class='icon wawrecipe-arrows32'></i></span>",
    fade: false,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  //***************************
  // ThumbSlider Functions
  //***************************
  jQuery('.wawrecipe-recipe-thumb').slick({
    slidesToShow: 1,
    autoplay: true,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    dots: true,
    asNavFor: '.wawrecipe-recipe-thumb-list'
  });
  jQuery('.wawrecipe-recipe-thumb-list').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    asNavFor: '.wawrecipe-recipe-thumb',
    dots: false,
    arrows: false,
    vertical: false,
    centerMode: false,
    focusOnSelect: true,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          vertical: false,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          vertical: false,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          vertical: false,
        }
      }
    ]
  });
})