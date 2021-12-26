//Include files for starting the code
const inquirer = require("inquirer"); 
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const fs = require("fs");

//for output file creation
const outputPath = "./dist/team.html";

/**
 * Creating questionaire for getting Manager details when application is started .
 * Here the choice of Role is not given , the role is hard coded as Manager while checking answers for initial input as per the aceptance criteria to avoid errors .This is done only when application is started this questinaire is not called when more users are added
 */
const ManagerQs= [
  {
    type: "input",
    name: "name",
    message: "Enter Managers's name",
    validate: function (answer) {
      if (answer.length < 1) {
          return console.log("A valid name is required.(Name cannot be < 1)");
      }
      return true;
      }
  },

  {
    type: "input",      
    name: "id",
    message: "What is Manager's employee id?",
    validate: function (answer) {
      if (answer.length <= 0) {
          return console.log("A valid id is  required.");
      }
      return true;
      }
  },
  {
    type: "input",
    name: "email",
    message: "What Manager's email id?",
    validate: function (answer) {
      if (answer.length <= 1) {
          return console.log("A valid  email id is  required.");
      }
      return true;
      }
  },
  {
    type: "input",
    name: "role",
    message: "Please enter Manager's Role as Manager",
    validate: function (answer) {
      if (answer.length <= 1) {
          return console.log("A valid  role is  required.");
      }
      return true;
      }
    //choices: ["Manager", "Engineer", "Intern"],
  }
  
]

/**
 * Generic questionaire for employee irrespective of role used when count >0, i.e. Manager role is asked in the beginning , if user wants to add second manager, choice is givene to user
 */
const EmployeeQs = [
    {
      type: "input",
      name: "name",
      message: "Enter employee's name",
      validate: function (answer) {
        if (answer.length < 1) {
            return console.log("A valid name is required.(Name cannot be < 1)");
        }
        return true;
        }
    },
  
    {
      type: "input",      
      name: "id",
      message: "What  employee id?",
      validate: function (answer) {
        if (answer.length <= 0) {
            return console.log("A valid id is  required.");
        }
        return true;
        }
    },
    {
      type: "input",
      name: "email",
      message: "What employee's email id?",
      validate: function (answer) {
        if (answer.length <= 1) {
            return console.log("A valid  email id is  required.");
        }
        return true;
        }
    },
    {
      type: "list",
      name: "role",
      message: "Please enter employee Role",
      choices: ["Manager", "Engineer", "Intern"],
    }
    /*{
        type: "input",
        name: "officeNumber",
        message: "Please enter Manager's office number",
        validate: function (answer) {
          if (answer.length <= 1) {
              return console.log("A valid  office number is  required.");
          }
          return true;
          }
      }*/
  ];
  
  const team = [];
  var count =0;
  const createTeam = () => {
    if(count === 0)
    {
     
      inquirer
      .prompt(ManagerQs)
      .then((answer1) => {
        answer1.role = "Manager"
        inquirer
          .prompt([
            {
              
              when: () => answer1.role === "Manager",
              type: "input",
              message: "What is their office number",
              name: "officeNumber",
            },
            {
              type: "confirm",
              message: "Do you wnat to add another team member?(Press Y for Yes , N for No)",
              name: "addMember",
            },
          ])
  
          .then((answer2) => {
            if (answer1.role === "Manager") {
              const manager = new Manager(answer1.name, answer1.id, answer1.email, answer1.role, answer2.officeNumber);
              team.push(manager);
              console.log(team);
            }
              if (answer2.addMember) { 
                ++count;
              createTeam();
            } else {
              team.forEach((team) => {
                console.log(team);
              });
               fs.writeFile(outputPath, createHTML(team), (err) => {
                if (err) {
                  throw err;
                }
                console.log("Success, team HTML is created!");
              });
            // writeFile(outputPath,createHTML(team));
            }  
          });
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });

    }
    else
    {
      inquirer
      .prompt(EmployeeQs)
      .then((answer1) => {
        inquirer
          .prompt([
            {
              when: () => answer1.role === "Manager",
              type: "input",
              message: "What is their office number",
              name: "officeNumber",
            },
            {
              when: () => answer1.role === "Engineer",
  
              type: "input",
              message: "What is the GitHub Username(without @)?",
              name: "github",
            },
  
            {
              when: () => answer1.role === "Intern",
  
              type: "input",
              message: "What is the school name?",
              name: "school",
            },
  
            {
              type: "confirm",
              message: "Do you want to add another team member?(Press Y for Yes N for No)",
              name: "addMember",
            },
          ])
  
          .then((answer2) => {
            if (answer1.role === "Manager") {
              const manager = new Manager(answer1.name, answer1.id, answer1.email, answer1.role, answer2.officeNumber);
              team.push(manager);
              console.log(team);
            }
  
            if (answer1.role === "Engineer") {
              const engineer = new Engineer(answer1.name, answer1.id, answer1.email, answer1.role, answer2.github);
              team.push(engineer);
            }
  
            if (answer1.role === "Intern") {
              const intern = new Intern(answer1.name, answer1.id, answer1.email, answer1.role, answer2.school);
              team.push(intern);
            }
            if (answer2.addMember) {
              createTeam();
            } else {
              team.forEach((team) => {
                console.log(team);
              });
               fs.writeFile(outputPath, createHTML(team), (err) => {
                if (err) {
                  throw err;
                }
                console.log("Success, team HTML is created!");
              });
            // writeFile(outputPath,createHTML(team));
            }  
          });
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });
    }
  };
  
  /*function writeToFile(path, data) {
    fs.writeFile(path, data, err => {
        if (err) {
          return console.log(err);
        }
      
        console.log("Success! Your HTML file has been generated")
    });
}

  const writeFile = util.promisify(writeToFile);*/



  createTeam();
  function createHTML(team)
  {
    let draftAns = `<!DOCTYPE html> 
    <html lang="en"> 
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Team Generator</title>

      <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
      crossorigin="anonymous"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
      rel="stylesheet"
    />
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script> <!-- to use font awesome-->
   
    <link rel="stylesheet" href="style.css">
    </head>
  
    <body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 jumbotron mb-3 team-heading">
                <h1 class="text-center">My Team</h1>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="team-area col-12 d-flex justify-content-center">`;  //close 3 div and 1 body
  let manager = team.find(manager => {
         return  manager.role == "Manager"
      })
      //console.log("FRom html");console.log(manager); console.log(team);
     /* let manName = manager.getName();
      let manRole = manager.getRole();
      let manId = manager.getId();
      let manEmail = manager.getEmail();
      let manOfficeNumber = manager.getOfficeNumber();*/
      draftAns += `<div class="card employee-card">
      <div class="card-header">
          <h2 class="card-title">${manager.getName()}</h2>
          <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${manager.getRole()}</h3>
      </div> <!--reference : https://fontawesome.com/v5.15/how-to-use/on-the-web/referencing-icons/basic-use-->
      <div class="card-body">
          <ul class="details">
              <li class="group-details">ID: ${manager.getId()}</li>
              <li class="group-details">Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
              <li class="group-details">Office number: ${manager.getOfficeNumber()}</li>
          </ul>
      </div>
  </div>`;
  let engineer = team.find(engineer => {
    return  engineer.role == "Engineer"
 })

  if(engineer!= undefined) 
  {draftAns += `<div class="card employee-card">
              <div class="card-header">
                  <h2 class="card-title">${engineer.getName()}</h2>
                  <h3 class="card-title"><i class="fas fa-glasses"></i>
                  ${engineer.getRole()}</h3>
              </div>
              <div class="card-body">
                  <ul class="details">
                      <li class="group-details">ID: ${engineer.getId()}</li>
                      <li class="group-details">Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
                      <li class="group-details">GitHub: <a href="https://github.com/${engineer.getGithub()}" target="_blank" rel="noopener noreferrer">${ engineer.getGithub() }</a></li>
                  </ul>
              </div>
          </div>
          `}
    var intern = team.find(intern => {
        return intern.role == "Intern"
         })
        if(intern != undefined)
        {
          draftAns += `<div class="card employee-card">
          <div class="card-header">
              <h2 class="card-title">${intern.getName()}</h2>
              <h3 class="card-title"><i class="fas fa-graduation-cap"></i>${ intern.getRole()}</h3>
          </div>
          <div class="card-body">
              <ul class="details">
                  <li class="group-details">ID: ${intern.getId()}</li>
                  <li class="group-details">Email id: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></li>
                  <li class="group-details">School: ${intern.getSchool()}</li>
              </ul>
          </div>
      </div> `}
      draftAns += `
      </div>
      </div>
      </div>
      </body> `;

      return draftAns;
  }
