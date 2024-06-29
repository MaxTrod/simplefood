
$(function () {});

// /*-----Липкая шапка ------------------------------------------------------------------------*/
window.addEventListener('scroll', function () {
  if(scrollY > 0) {
    document.querySelector('.header').classList.add('header--scroll');
  } else {
    document.querySelector('.header').classList.remove('header--scroll');
  }
});

// /*-----Табы ------------------------------------------------------------------------*/

document.addEventListener("click", documentActions);

function documentActions(e) {
  const targetElement = e.target;

  if (targetElement.closest(".nav-popular-categories__item")) {
    const tabNavItem = targetElement.closest(".nav-popular-categories__item");
    if (!tabNavItem.classList.contains("active-tab")) {
      const activeTabNavItem = document.querySelector(".nav-popular-categories__item.active-tab");
      activeTabNavItem.classList.remove("active-tab");
      tabNavItem.classList.add("active-tab");

      const tabItems = document.querySelectorAll(".popular-categories__tab");
      const activeTabItem = document.querySelector(".popular-categories__tab.active-tab");

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
      loop: true,
      pagination: {
        el: ".clients-reviews__pagination",
        clickable: true,
      },
      navigation: {
        nextEl: '.clients-reviews__next',
        prevEl: '.clients-reviews__prev',
      },
    });
  }

  if (document.querySelector(".best-restaurants__slider")) {
    const restaurantsSlider = new Swiper(".best-restaurants__slider", {
      // loop: true,
      slidesPerView: 3,
      slidesPerGroup: 2,
      spaceBetween: 30,
      grid: {
				rows: 2,
			},
      autoHeight: false,
      pagination: {
        el: ".best-restaurants__pagination",
        clickable: true,
      },
    });
  }
}
initSliders();
