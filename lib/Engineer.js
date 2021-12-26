//require Employee class
const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email, role, github) {
    super(name, id, email);  //reference: https://www.w3schools.com/js/js_class_inheritance.asp
    this.github = github; 
    this.role = role
  }

  getGithub() {
    return this.github;
  }
  getRole() {
    return this.role; 
  }
}
module.exports = Engineer;