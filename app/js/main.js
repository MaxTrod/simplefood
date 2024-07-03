$(function () {});
// /*-----header меню ------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".icon-menu");
  const burgerX = document.querySelector(".menu__close-button");
  const mobileMenu = document.querySelector(".menu__body");
  const bodyLock = document.querySelector("body");

  burger.addEventListener("click", () => {
    mobileMenu.classList.toggle("menu--active");
    if (mobileMenu.classList.contains("menu--active")) {
      bodyLock.classList.add("lock");
    } else {
      bodyLock.classList.remove("lock");
    }
  });

  burgerX.addEventListener("click", () => {
    mobileMenu.classList.remove("menu--active");
    bodyLock.classList.remove("lock");
  });

  //Клик вне таргета
  document.addEventListener("click", function (e) {
    if (e.target !== burger && e.target !== mobileMenu) {
      mobileMenu.classList.remove("menu--active");
      bodyLock.classList.remove("lock");
    }
  });
});
// /*-----header меню ------------------------------------------------------------------------*/
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

/*-----Слайдер ------------------------------------------------------------------------*/

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
}
initSliders();
