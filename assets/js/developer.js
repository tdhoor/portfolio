export default class Developer {
  /**
   * A developer is an individual that builds and create software and applications.
   * He or she writes, debugs and executes the source code of a software application.
   * @param {String} name of the developer.
   * @param {String} birthday of the developer.
   */
  constructor(name, birthday) {
    this.name = name;
    this.birthday = birthday;
    this.skills = {};
  }

  /**
   * Add a skill to the developer.
   * @param {Skills} skill from a developer field e.g. frontend, backend,...
   */
  addSkill(skill) {
    this.skills[skill.name] = skill.skills;
  }

  /**
   * Take a look at the name, birthday and excellent features of the developer.
   */
  print() {
    console.log(JSON.stringify(this));
  }
}
