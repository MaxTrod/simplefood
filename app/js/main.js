$(function() {

});

document.addEventListener('click', documentActions);

function documentActions(e) {
  const targetElement = e.target;

  if(targetElement.closest('.nav-categories__item')) {
    const tabNavItem = targetElement.closest('.nav-categories__item');
    if(!tabNavItem.classList.contains('active-tab')) {
      const activeTabNavItem = document.querySelector('.nav-categories__item.active-tab');
      activeTabNavItem.classList.remove('active-tab');
      tabNavItem.classList.add('active-tab');

      const tabItems = document.querySelectorAll('.categories__tab');
      const activeTabItem = document.querySelector('.categories__tab.active-tab');

      activeTabItem.classList.remove('active-tab');
      tabItems[getIndex(tabNavItem)].classList.add('active-tab');
    }
  }
}

function getIndex(el){
  return Array.from(el.parentNode.children).indexOf(el);
}