export default class Helpers {
  /**
   * Method that checks whether className is present in element object.
   * @param  {Object} element DOM element which needs to be checked
   * @param  {Object} className Classname is tested
   * @return {Boolean} True if className is present, false otherwise.
   */
  static hasClass(element, className) {
    return element.getAttribute("class").indexOf(className) > -1;
  }

  /**
   * Method that adds a class to given elementment.
   * @param  {Object} element DOM element where class needs to be added
   * @param  {Object} className Classname which is to be added
   * @return {null} nothing is returned.
   */
  static addClass(element, className) {
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
  static removeClass(element, className) {
    if (element.classList) {
      element.classList.remove(className);
    } else if (hasClass(element, className)) {
      element.setAttribute(
        "class",
        element.getAttribute("class").replace(className, " ")
      );
    }
  }
}
