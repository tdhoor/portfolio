import Helpers from "./helper.js";
import Printer from "./printer.js";
import Developer from "./developer.js";
import Skills from "./skills.js";

var projects = null;
var effectCurtonElements = null;
var firstLoad = true;

/**
 * Initialize all Buttons;
 */
function initButton() {
  var btnBackToTop = document.getElementById("btn-up");
  var btnsMenu = document.querySelectorAll(".btn-secondary");
  var filterBtns = document.querySelectorAll(".btn-primary");

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
      Helpers.addClass(element, "active");
    } else {
      Helpers.removeClass(element, "active");
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
    Helpers.removeClass(element, "hide");
    Helpers.addClass(element, "show");
  } else {
    Helpers.removeClass(element, "show");
    Helpers.addClass(element, "hide");
  }
}

function initSlider() {
  var sliderBtn = document.querySelectorAll(".btn-slider");

  for (var i = 0; i < sliderBtn.length; i++) {
    sliderBtn[i].addEventListener("click", function () {
      var sliderChildren = this.parentNode.getElementsByTagName("img");
      var foundNext = false;

      for (var j = 0; j < sliderChildren.length; j++) {
        if (!Helpers.hasClass(el, "inactive") && !foundNext) {
          var nextPos = index + 1 >= sliderChildren.length ? 0 : index + 1;
          Helpers.removeClass(sliderChildren[nextPos], "inactive");
          Helpers.addClass(el, "inactive");
          foundNext = true;
        }
      }
    });
  }
}

/* Event Listeners */

window.addEventListener("resize", function () {
  initNavBar();
});

window.addEventListener("load", function () {
  firstLoad = false;
  initButton();
  initNavBar();
  initSlider();

  projects = document.querySelectorAll(
    ".dev-frontend, .dev-fullstack, .dev-mobile"
  ); // Initialize projects

  effectCurtonElements = document.querySelectorAll(".curtain-eff");

  var title = document.getElementsByTagName("title")[0].innerHTML;

  // Init Printer only on about me page
  if (title === "Thomas Dorfer | About") {
    var outputField = document.getElementById("outputField");
    var thomas = new Developer("ThomasDorfer", "06.09.1994");
    var frontend = new Skills("frontend", ["html", "css", "javascript"]);
    var backend = new Skills("backend", ["php", "sql"]);
    var mobile = new Skills("mobile", ["java", "android", "react native"]);

    thomas.addSkill(frontend);
    thomas.addSkill(backend);
    thomas.addSkill(mobile);

    var printer = new Printer(outputField, thomas);
    printer.start((param) => (outputField.innerHTML += param));
  }
});

window.onscroll = function () {
  if (!firstLoad) {
    effectCurtonElements.forEach((element, index) => {
      scrollAppear(element, index);
    });
  }
};
