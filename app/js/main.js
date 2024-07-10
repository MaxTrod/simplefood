
$(function () {

    $(".header-catalog__select").styler();

/* ----------------------------неудачные методы решения скрывания текста за точками-------------------*/
  // (function(){
  //   if (typeof WebFont != 'undefined') {
  //        WebFontConfig = {
  //             custom: {
  //                 families: ['Rubik']
  //             },
  //             active: function() {
  //                 $('select, :checkbox, :radio').trigger('refresh');
  //             }
  //         };
  //         WebFont.load(WebFontConfig);
  //    }
  // })();

  // $(".header-catalog__select").styler();
  // setTimeout(function() {
  //   $('.header-catalog__select').styler();
  // }, 1000);

// /*-----RANGE SLIDER ------------------------------------------------------------------------*/
  var $range = $(".filter-price__slider-input"),
    $inputFrom = $(".filter-price__input--from"),
    $inputTo = $(".filter-price__input--to"),
    instance,
    min = 0,
    max = 1200,
    from = 0,
    to = 0;

  $range.ionRangeSlider({
    skin: "round",
    type: "double",
    min: min,
    max: max,
    from: 100,
    to: 1000,
    onStart: updateInputs,
    onChange: updateInputs,
  });
  instance = $range.data("ionRangeSlider");

  function updateInputs(data) {
    from = data.from;
    to = data.to;

    $inputFrom.prop("value", from);
    $inputTo.prop("value", to);
  }

  $inputFrom.on("input", function () {
    var val = $(this).prop("value");

    // validate
    if (val < min) {
      val = min;
    } else if (val > to) {
      val = to;
    }

    instance.update({
      from: val,
    });
  });

  $inputTo.on("input", function () {
    var val = $(this).prop("value");

    // validate
    if (val < from) {
      val = from;
    } else if (val > max) {
      val = max;
    }

    instance.update({
      to: val,
    });
  });
});

// /*-----бургеры ------------------------------------------------------------------------*/
document.addEventListener("click", burgerActions);

if(document.querySelector('.catalog')) {
  document.addEventListener("click", catalogActions);
}

function burgerActions(e) {
  const targetElement = e.target;
  const header = document.querySelector('header');
  const headerMenu = document.querySelector(".menu__body");
  const bodyLock = document.querySelector("body");

  if (targetElement.closest(".icon-menu")) {
    header.classList.add("header--active");
    headerMenu.classList.add("menu--active");
    bodyLock.classList.add("lock");

  }  else if (targetElement.closest(".menu__close-button") || !targetElement.closest(".menu__body")) {
    header.classList.remove("header--active");
    headerMenu.classList.remove("menu--active");
    bodyLock.classList.remove("lock");
  }
}

function catalogActions(e) {
  const targetElement = e.target;
  const header = document.querySelector('header');
  const catalogMenu = document.querySelector(".catalog__body");
  const bodyLock = document.querySelector("body");

  if (targetElement.closest(".header-catalog__button")) {
    header.classList.add("header--active-catalog");
    catalogMenu.classList.add("catalog--active");
    bodyLock.classList.add("lock-catalog");

  } else if (targetElement.closest(".catalog__close-button") || !targetElement.closest(".catalog__body")) {
    header.classList.remove("header--active-catalog");
    catalogMenu.classList.remove("catalog--active");
    bodyLock.classList.remove("lock-catalog");
  }
}

// /*-----Липкая шапка ------------------------------------------------------------------------*/
window.addEventListener("scroll", function () {
  if (scrollY > 0) {
    document.querySelector(".header").classList.add("header--scroll");
  } else {
    document.querySelector(".header").classList.remove("header--scroll");
  }
});

// /*-----Табы ------------------------------------------------------------------------*/

document.addEventListener("click", documentActions);

function documentActions(e) {
  const targetElement = e.target;

  if (targetElement.closest(".nav-popular-categories__button")) {
    const tabNavItem = targetElement.closest(".nav-popular-categories__button");
    if (!tabNavItem.classList.contains("active-tab")) {
      const activeTabNavItem = document.querySelector(
        ".nav-popular-categories__button.active-tab"
      );
      activeTabNavItem.classList.remove("active-tab");
      tabNavItem.classList.add("active-tab");

      const tabItems = document.querySelectorAll(".popular-categories__tab");
      const activeTabItem = document.querySelector(
        ".popular-categories__tab.active-tab"
      );

      activeTabItem.classList.remove("active-tab");
      tabItems[getIndex(tabNavItem)].classList.add("active-tab");
    }
  }
}

function getIndex(el) {
  return Array.from(el.parentNode.children).indexOf(el);
}

/*-----Слайдеры swiper ------------------------------------------------------------------------*/

function initSliders() {
  if (document.querySelector(".clients-reviews__slider")) {
    const clientsSlider = new Swiper(".clients-reviews__slider", {
      autoHeight: true,
      loop: false,
      pagination: {
        el: ".clients-reviews__pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".clients-reviews__next",
        prevEl: ".clients-reviews__prev",
      },
    });
  }

  if (document.querySelector(".best-restaurants__slider")) {
    const restaurantsSlider = new Swiper(".best-restaurants__slider", {
      autoHeight: false,
      pagination: {
        el: ".best-restaurants__pagination",
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 15,
          grid: {
            rows: 1,
          },
        },
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 20,
          grid: {
            rows: 1,
          },
        },
        992: {
          slidesPerView: 3,
          slidesPerGroup: 2,
          spaceBetween: 30,
          grid: {
            rows: 2,
          },
        },
      },
    });
  }

  if (document.querySelector(".promo__slider")) {
    const promoSlider = new Swiper(".promo__slider", {
      autoHeight: false,
      pagination: {
        el: ".promo__pagination",
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        576: {
          slidesPerView: 2.1,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  }
}
initSliders();


