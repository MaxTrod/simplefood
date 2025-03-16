$(function () {

  //---------------------------Функция прокрутки до футера-----------------------------------------------------------------

  $(".menu__nav-link--contacts").on("click", function (e) {
    $(this).toggleClass("active-link");
    e.preventDefault();

    var id = $(this).attr("href"),
      top = $(id).offset().top;

    $("body,html").animate({ scrollTop: top - 30 }, 1000);
  });

  //---------------------------Функция прокрутки верха страницы-----------------------------------------------------------------

  $(".logo").on("click", function (e) {
    e.preventDefault();
    $("body,html").animate({ scrollTop: 0 }, 1000);
  });

  //---------------------------Звездные рейтинги-----------------------------------------------------------------

  $(".star").rateYo({
    starWidth: "16px",
    normalFill: "rgba(193, 193, 193, 0.3)",
    ratedFill: "#ffb800",
    readOnly: "true",
    starSvg:
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0.0229731 6.16432C0.0780973 5.9946 0.224753 5.87091 0.401315 5.84529L5.36139 5.12451L7.57966 0.629933C7.6586 0.469933 7.82157 0.368652 7.99997 0.368652C8.17841 0.368652 8.34135 0.469933 8.42032 0.629933L10.6387 5.12451L15.5987 5.84529C15.7752 5.87091 15.9219 5.9946 15.977 6.16429C16.0322 6.334 15.9862 6.52028 15.8584 6.64481L12.2694 10.1434L13.1165 15.0834C13.1467 15.2593 13.0744 15.437 12.9301 15.5419C12.8484 15.6012 12.7517 15.6314 12.6545 15.6314C12.5799 15.6314 12.505 15.6136 12.4365 15.5776L8 13.2451L3.56374 15.5775C3.40577 15.6606 3.21443 15.6467 3.07009 15.5419C2.92574 15.437 2.8534 15.2593 2.88356 15.0834L3.73096 10.1434L0.141566 6.64478C0.0138168 6.52028 -0.0322151 6.334 0.0229731 6.16432Z"/> </svg>',
    spacing: "5px",
    fullStar: true,
  });

  $(".feedback-review__star").rateYo({
    starWidth: "16px",
    normalFill: "#c1c1c1",
    ratedFill: "#ffb800",
    starSvg:
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0.0229731 6.16432C0.0780973 5.9946 0.224753 5.87091 0.401315 5.84529L5.36139 5.12451L7.57966 0.629933C7.6586 0.469933 7.82157 0.368652 7.99997 0.368652C8.17841 0.368652 8.34135 0.469933 8.42032 0.629933L10.6387 5.12451L15.5987 5.84529C15.7752 5.87091 15.9219 5.9946 15.977 6.16429C16.0322 6.334 15.9862 6.52028 15.8584 6.64481L12.2694 10.1434L13.1165 15.0834C13.1467 15.2593 13.0744 15.437 12.9301 15.5419C12.8484 15.6012 12.7517 15.6314 12.6545 15.6314C12.5799 15.6314 12.505 15.6136 12.4365 15.5776L8 13.2451L3.56374 15.5775C3.40577 15.6606 3.21443 15.6467 3.07009 15.5419C2.92574 15.437 2.8534 15.2593 2.88356 15.0834L3.73096 10.1434L0.141566 6.64478C0.0138168 6.52028 -0.0322151 6.334 0.0229731 6.16432Z"/> </svg>',
    spacing: "5px",
    fullStar: true,
    onSet: function (rating, rateYoInstance) {
      $(".feedback-review__hidden").val(rating);
      $(".feedback-review__error").text("");
    },
  });
  $(".feedback-review__form").on("submit", function (event) {
    var rating = $(".feedback-review__hidden").val();
    if (!rating) {
      event.preventDefault();
      $(".feedback-review__error").text("Пожалуйста, укажите вашу оценку.");
    }
  });

  //---------------------------Cтилизация селектов и выбора количества товаров-----------------------------------------------------------------

  $(".header-catalog__select, .content-product__num").styler();

  // /*----------------------------RANGE SLIDER ------------------------------------------------------------------------*/

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

// /*------------------------------Мобильное меню в header ------------------------------------------------------------------------*/

document.addEventListener("click", burgerActions);

if (document.querySelector(".catalog")) {
  document.addEventListener("click", catalogActions);
}

function burgerActions(e) {
  const targetElement = e.target;
  const header = document.querySelector("header");
  const headerMenu = document.querySelector(".menu__body");
  const bodyLock = document.querySelector("body");

  if (targetElement.closest(".icon-menu")) {
    header.classList.add("header--active");
    headerMenu.classList.add("menu--active");
    bodyLock.classList.add("lock");
  } else if (
    targetElement.closest(".menu__close-button") ||
    !targetElement.closest(".menu__body")
  ) {
    header.classList.remove("header--active");
    headerMenu.classList.remove("menu--active");
    bodyLock.classList.remove("lock");
  }
}

// /*------------------------------Мобильное меню каталога ------------------------------------------------------------------------*/

function catalogActions(e) {
  const targetElement = e.target;
  const header = document.querySelector("header");
  const catalogMenu = document.querySelector(".catalog__body");
  const bodyLock = document.querySelector("body");

  if (targetElement.closest(".header-catalog__button")) {
    header.classList.add("header--active-catalog");
    catalogMenu.classList.add("catalog--active");
    bodyLock.classList.add("lock-catalog");
  } else if (
    targetElement.closest(".catalog__close-button") ||
    !targetElement.closest(".catalog__body")
  ) {
    header.classList.remove("header--active-catalog");
    catalogMenu.classList.remove("catalog--active");
    bodyLock.classList.remove("lock-catalog");
  }
}

// /*-----------------------------------------Липкая шапка ------------------------------------------------------------------------*/

window.addEventListener("scroll", function () {
  if (scrollY > 0) {
    document.querySelector(".header").classList.add("header--scroll");
  } else {
    document.querySelector(".header").classList.remove("header--scroll");
  }
});

// /*------------------------------------------Табы секции популярные категории------------------------------------------------------------------------*/

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

 /*------------------------------------------Табы описания товара------------------------------------------------------------------------*/

  if (targetElement.closest(".tabs-product__btn")) {
    const productBtn = targetElement.closest(".tabs-product__btn");
    if (!productBtn.classList.contains("active-tab")) {
      const activeProductBtn = document.querySelector(
        ".tabs-product__btn.active-tab"
      );
      activeProductBtn.classList.remove("active-tab");
      productBtn.classList.add("active-tab");

      const productTabs = document.querySelectorAll(".tabs-product__tab");
      const activeProductTabs = document.querySelector(
        ".tabs-product__tab.active-tab"
      );

      activeProductTabs.classList.remove("active-tab");
      productTabs[getIndex(productBtn)].classList.add("active-tab");
    }
  }
}

function getIndex(el) {
  return Array.from(el.parentNode.children).indexOf(el);
}

/*----------------------------------------------------Слайдеры swiper ------------------------------------------------------------------------*/

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

  if (document.querySelector(".slider-product")) {
    const productSlider = new Swiper(".slider-product", {
      slidesPerView: 1,
      autoHeight: false,
      pagination: {
        el: ".slider-product__pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".slider-product__next",
        prevEl: ".slider-product__prev",
      },
    });
  }

  if (document.querySelector(".product-recent__slider")) {
    const productRecentSlider = new Swiper(".product-recent__slider", {
      pagination: {
        el: ".product-recent__pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".product-recent__btn-next",
        prevEl: ".product-recent__btn-prev",
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 5,
          slidesPerGroup: 2
        },
        576: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
       768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      },
    });
  }
}
initSliders();

//------------------------------------функция для настройки breadcrumbs----------------------------------------------------------------

function breadcrumbs() {
  const breadList = document.querySelector('.breadcrumbs__list');
  const breadCatalog = document.querySelector(".breadcrumbs__link--catalog");
  const breadProduct = document.querySelector(".breadcrumbs__link--product");
  if (document.getElementById("catalog-page")) {
    breadCatalog.parentElement.nextElementSibling.remove();
    breadCatalog.removeAttribute("href");
  }
  if (document.getElementById("product-page")) {
    breadProduct.removeAttribute("href");
  }
  function removeItem() {
    if(document.getElementById("product-page")) {
      if(window.innerWidth < 768) {
          breadCatalog.parentElement.style.display = "none";
      } else {
        breadCatalog.parentElement.style.display = "block";
      }
    }
  }
  removeItem();
  window.addEventListener('resize', removeItem);
}
breadcrumbs();

//----------------------------------------------Функция добавления числа отзывов------------------------------------------------------

function reviewsNumber() {
  const numberReviews = document.querySelector(".tabs-product__number");
  const allReviews = document.querySelectorAll(".opinion-review__content");

  if (document.querySelector("#product-page")) {
    numberReviews.insertAdjacentText("beforeend", `${allReviews.length}`);
  }
}
reviewsNumber();

//--------------------------------------------------carousel and fancybox------------------------------------------------------------------

if(document.getElementById('product-page')) {

  // Инициализация слайдера
  let myCarousel;

  function initCarousel() {
    myCarousel = new Carousel(document.getElementById("myCarousel"), {
      preload: 2,
      Dots: false,
      infinite: false,
    });
  
    Fancybox.bind('[data-fancybox="gallery"]', {
      infinite: false,
      Thumbs: false,
      Toolbar: false,
      closeButton: "top",
      Carousel: {
        Dots: true,
        on: {
          change: (that) => {
            if (myCarousel) {
              myCarousel.slideTo(myCarousel.findPageForSlide(that.page), {
                friction: 0,
              });
            }
          },
        },
      },
    });
  }
  initCarousel();
  
  // Функция для проверки ширины окна и управления слайдером
  function checkWindowSize() {
    if (window.innerWidth <= 576) {
      if (myCarousel) {
        myCarousel.destroy();
        myCarousel = null;  
      }
    } else {
      if (!myCarousel) {
        initCarousel();
      }
    }
  }
  
  // checkWindowSize();
  
  // window.addEventListener('resize', checkWindowSize);
}







