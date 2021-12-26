const Intern = require("../lib/Intern");


test("Check if can create Intern instance", () => {
    const intern   = new Intern(); //check if we can create the object of the class intern it should fail initially as no class/function is defined or created 
    expect(typeof intern).toBe("object");
  });

test("Check if can pass school name via constructor", () => {
  const testSchool = "University of Toronto";
  const intern = new Intern("AK", 1, "avneet@avneet.com", "Intern", testSchool);
  expect(intern.school).toBe(testSchool);
});

test('creates a Engineer  object', () => {
  //const testGithub = "GitHubUser";
  const intern = new Intern("AK", 1, "avneet@avneet.com", "Intern","University of Toronto");
  expect(intern.name).toEqual(expect.any(String));
  expect(intern.name.length).toBeGreaterThan(0);
  expect(intern.id).toEqual(expect.any(Number));
  expect(intern.email).toEqual(expect.any(String));
  expect(intern.email.length).toBeGreaterThan(0);
  expect(intern.school).toEqual(expect.any(String));
  expect(intern.school.length).toBeGreaterThan(0);
  
  
});