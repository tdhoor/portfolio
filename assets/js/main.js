// before
import Helpers from "./helper.js";
import Printer from "./printer.js";
import Developer from "./developer.js";
import Skills from "./skills.js";

let projects = null;
let effectCurtonElements = null;
let firstLoad = true;

let btnBackToTop;
let btnsMenu;
let filterBtns;

let menuToggle;
let menuToggleIcon;
let navBar;

let sliderBtn;

/**
 * Initialize back-to-top button, filter-buttons and the filter buttons.
 */
function initButton() {
  btnBackToTop = document.getElementById("btn-up");
  btnsMenu = document.querySelectorAll(".btn-secondary");
  filterBtns = document.querySelectorAll(".btn-primary");

  btnBackToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: `smooth` });
  });

  for (let i = 0; i < btnsMenu.length; i++) {
    btnsMenu[i].addEventListener("click", () => {
      handleActiveBtn(btnsMenu, btnsMenu[i]);
    });
  }

  for (let i = 0; i < filterBtns.length; i++) {
    filterBtns[i].addEventListener("click", () => {
      handleActiveBtn(filterBtns, filterBtns[i]);
      filterProjects(filterBtns[i]);
    });
  }
}

/**
 * Filter all projects by the clicked categorie-button.
 * @param  {Object} btn DOM element filter button
 */
function filterProjects(btn) {
  if (typeof btn.dataset.filter === "undefined") {
    return;
  }

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].dataset.result === btn.dataset.filter) {
      Helpers.addClass(projects[i], "active");
    } else {
      Helpers.removeClass(projects[i], "active");
    }
  }
}

/**
 * Initialize menu-button and menu-curton effect.
 */
function initNavBar() {
  menuToggle = document.getElementById("btn-menu-toggle");
  menuToggleIcon = document.getElementById("burgericon");
  navBar = document.getElementById("nav-bar");

  menuToggle.addEventListener("click", () => {
    Helpers.toggleClass(menuToggleIcon, "changeIcon");
    Helpers.toggleClass(menuToggleIcon, "toggle");
    Helpers.toggleClass(menuToggleIcon, "toggleTwo");
    Helpers.toggleClass(navBar, "show");
  });
}

/**
 * Toggle the class "active" by clicking a menu-button.
 * @param  {Object} btns DOM element menu-buttons
 * @param  {Object} clickedButton DOM element clicked button
 */
function handleActiveBtn(btns, clickedButton) {
  for (let i = 0; i < btns.length; i++) {
    if (btns[i] === clickedButton) {
      Helpers.addClass(btns[i], "active");
    } else {
      Helpers.removeClass(btns[i], "active");
    }
  }
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
    Helpers.removeClass(element, "hide");
    Helpers.addClass(element, "show");
  } else {
    Helpers.removeClass(element, "show");
    Helpers.addClass(element, "hide");
  }
}

/**
 * Initialize the project-img-sliders.
 */
function initSlider() {
  let sliderParent;
  let sliderChildren;
  sliderBtn = document.querySelectorAll(".btn-slider");

  for (let i = 0; i < sliderBtn.length; i++) {
    sliderBtn[i].addEventListener("click", () => {
      sliderParent = sliderBtn[i].parentNode;
      sliderChildren = sliderParent.getElementsByTagName("img");
      let foundNext = false;
      let children = Array.prototype.slice.call(sliderChildren);

      for (let i = 0; i < children.length; i++) {
        if (!Helpers.hasClass(children[i], "inactive") && !foundNext) {
          let nextPos = i + 1 >= children.length ? 0 : i + 1;
          Helpers.removeClass(children[nextPos], "inactive");
          Helpers.addClass(children[i], "inactive");
          foundNext = true;
        }
      }
    });
  }
}

/* Event Listeners */

window.addEventListener("load", function () {
  firstLoad = false;
  initButton();
  initNavBar();
  initSlider();

  projects = document.querySelectorAll(
    ".dev-frontend, .dev-fullstack, .dev-mobile"
  ); // Initialize projects

  effectCurtonElements = document.querySelectorAll(".curtain-eff");
  let title = document.getElementsByTagName("title")[0].innerHTML;

  // Init Printer only on about me page
  if (title === "Thomas Dorfer | About") {
    let outputField = document.getElementById("outputField");
    let thomas = new Developer("ThomasDorfer", "06.09.1994");
    let frontend = new Skills("frontend", ["html", "css", "javascript"]);
    let backend = new Skills("backend", ["php", "sql"]);
    let mobile = new Skills("mobile", ["java", "android", "react native"]);

    thomas.addSkill(frontend);
    thomas.addSkill(backend);
    thomas.addSkill(mobile);

    let printer = new Printer(outputField, thomas);
    printer.start((param) => (outputField.innerHTML += param));
  }
});

window.onscroll = function () {
  if (!firstLoad) {
    for (let i = 0; i < effectCurtonElements.length; i++) {
      scrollAppear(effectCurtonElements[i], i);
    }
  }
};
