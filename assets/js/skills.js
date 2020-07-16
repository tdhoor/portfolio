export default class Skills {
  /**
   * Depending on job role and type of software developed, a developer may be classified
   * as a frontend-, backend-, mobile developer etc.. Thus a developer can have differend
   * skills.
   * @param {String} name of skill field.
   * @param {Array(String)} skills from the named field.
   */
  constructor(name, skills) {
    this.name = name;
    this.skills = skills;
  }

  /**
   * Print out the skills.
   */
  print() {
    console.log(JSON.stringify(this));
  }
}
