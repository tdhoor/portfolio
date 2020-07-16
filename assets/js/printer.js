export default class Printer {
  /**
   * The printer can print-out details about a developer to an DOM-Element.
   * @param {DOM-Element} domElement is the DOM-Element which displays the developer.
   * @param {Developer} object is the developer, which should be displayed.
   */
  constructor(domElement, object) {
    this.domElement = domElement;
    this.object = "var object = " + JSON.stringify(object);
    this.deep = 0;
    this.pointerOne = 0;
    this.pointerTwo = 1;
    this.isInline = false;
    this.length = this.object.length;
  }

  /**
   * Starts printing the developer. Thus, each letter will be checkt and
   * returnd by a interval from 0 - 400ms to the callback function.
   * @param {Callback} next is the next printed letter.
   */
  start(next) {
    for (let i = 0; i < this.length; i++) {
      setTimeout(() => next(this.printNext()), Math.random() * 290 * i);
    }
  }

  /**
   * Checks every letter and adjusts the output so that you get a nice overview.
   */
  printNext() {
    let nextPos = this.object.slice(this.pointerOne, this.pointerTwo);
    let nextPrint;

    switch (nextPos) {
      case "{":
        this.deep++;
        nextPrint = this.printTab("{");
        break;
      case "}":
        this.deep--;
        nextPrint = this.printTab("}");
        break;
      case "[":
        this.isInline = true;
        nextPrint = "[";
        break;
      case "]":
        this.isInline = false;
        nextPrint = "]";
        break;
      case ",":
        nextPrint = this.isInline ? "," : this.printTab(",");
        break;
      case ",":
        nextPrint = this.printTab(",");
        break;
      default:
        nextPrint = nextPos;
        break;
    }

    this.pointerOne++;
    this.pointerTwo++;
    return nextPrint;
  }

  /**
   * Generate the correct amount of whitespace, to display the latter the
   * right position.
   * @param {String} param ist the letter, which will be returned.
   */
  printTab(param) {
    let tab = "\n";

    for (let i = 0; i < this.deep; i++) {
      tab += "&nbsp;";
    }
    return param === "}" ? tab + param : param + tab;
  }
}
