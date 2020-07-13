var btnBackToTop = null;
var btnsMenu = null;
var filterBtns = null;
var projects = null;
var effectCurtonElements = null;

/**
 * Initialize all Buttons;
 */
function initButton() {
  btnBackToTop = document.getElementById("btn-up");
  btnsMenu = document.querySelectorAll(".btn-secondary");
  filterBtns = document.querySelectorAll(".btn-primary");

  btnBackToTop.onclick = () => {
    window.scrollTo({ top: 0, behavior: `smooth` });
  };

  btnsMenu.forEach((btn) => {
    btn.onclick = () => handleActiveBtn(btnsMenu, btn);
  });

  filterBtns.forEach((btn) => {
    btn.onclick = () => {
      handleActiveBtn(filterBtns, btn);
      filterProjects(btn);
    };
  });
}

/**
 * Filter all projects by the clicked button.
 * @param  {Object} btn DOM element filter button
 */
function filterProjects(btn) {
  if (typeof btn.dataset.filter === "undefined") {
    return;
  }

  projects.forEach((element) => {
    if (element.dataset.result === btn.dataset.filter) {
      addClass(element, "active");
    } else {
      removeClass(element, "active");
    }
  });
}

/**
 * Initialize the menu + all effects, including menu-toggle effect and menu-curton effect.
 */
function initNavBar() {
  var menuToggle = document.getElementById("btn-menu-toggle");
  var menuToggleIcon = document.getElementById("burgericon");
  var navBar = document.getElementById("nav-bar");

  menuToggle.onclick = function () {
    menuToggleIcon.classList.toggle("changeIcon");
    menuToggleIcon.classList.toggle("toggle");
    menuToggleIcon.classList.toggle("toggleTwo");
    navBar.classList.toggle("show");
  };
}

/**
 * Toggle the class "active" by clicking a menu-button.
 * @param  {Object} btns DOM element menu-buttons
 * @param  {Object} clickedButton DOM element clicked button
 */
function handleActiveBtn(btns, clickedButton) {
  btns.forEach((btn) => {
    if (btn === clickedButton) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

/**
 * If the element is at a third of the display height (top or bottom), it appears or disappears.
 * @param  {Object} element DOM element where class needs to be removed
 */
function scrollAppear(element) {
  if (
    (window.innerHeight - element.getBoundingClientRect().top >
      window.innerHeight / 3 ||
      window.innerHeight - element.getBoundingClientRect().bottom >
        window.innerHeight / 3) &&
    window.innerHeight - element.getBoundingClientRect().bottom <
      window.innerHeight / 3
  ) {
    removeClass(element, "hide");
    addClass(element, "show");
  } else {
    removeClass(element, "show");
    addClass(element, "hide");
  }
}

var sliders;
var sliderBtn;
var sliderParent;
var sliderChildren;

function initSlider() {
  sliders = document.querySelectorAll(".demo");
  sliderBtn = document.querySelectorAll(".btn-slider");

  sliderBtn.forEach((element) => {
    element.onclick = () => {
      sliderParent = element.parentNode;
      sliderChildren = sliderParent.getElementsByTagName("img");
      var foundNext = false;

      [...sliderChildren].forEach((el, index) => {
        if (!hasClass(el, "inactive") && !foundNext) {
          var nextPos = index + 1 >= sliderChildren.length ? 0 : index + 1;
          removeClass(sliderChildren[nextPos], "inactive");
          addClass(el, "inactive");
          foundNext = true;
        }
      });
    };
  });
}

/* Helper functions */

/**
 * Method that checks whether className is present in element object.
 * @param  {Object} element DOM element which needs to be checked
 * @param  {Object} className Classname is tested
 * @return {Boolean} True if className is present, false otherwise.
 */
function hasClass(element, className) {
  return element.getAttribute("class").indexOf(className) > -1;
}

/**
 * Method that adds a class to given elementment.
 * @param  {Object} element DOM element where class needs to be added
 * @param  {Object} className Classname which is to be added
 * @return {null} nothing is returned.
 */
function addClass(element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else if (!hasClass(element, className)) {
    element.setAttribute(
      "class",
      element.getAttribute("class") + " " + className
    );
  }
}

/**
 * Method that does a check to ensure that class is removed from elementment.
 * @param  {Object} element DOM element where class needs to be removed
 * @param  {Object} className Classname which is to be removed
 * @return {null} Null nothing is returned.
 */
function removeClass(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else if (hasClass(element, className)) {
    element.setAttribute(
      "class",
      element.getAttribute("class").replace(className, " ")
    );
  }
}

/* Event Listeners */

window.addEventListener("resize", function () {
  initNavBar();
});

window.addEventListener("load", function () {
  initButton();
  initNavBar();
  initSlider();
  projects = document.querySelectorAll(
    ".dev-frontend, .dev-fullstack, .dev-mobile"
  ); // Initialize projects
  effectCurtonElements = document.querySelectorAll(".curtain-eff");
});

window.onscroll = function () {
  effectCurtonElements.forEach((element, index) => {
    scrollAppear(element, index);
  });
};
