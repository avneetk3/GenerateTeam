const Engineer = require("../lib/Engineer");


test("Check if can create Engineer instance", () => {
    const engineeer = new Engineer(); //check if we can create the object of the class engineer it should fail initially as no class/function is defined or created 
    expect(typeof engineeer).toBe("object");
  });

test("Check if we can set github user name via constructor", () => {
  const testGithub = "GitHubUser";
  const engineeer = new Engineer("AK", 1, "avneet@avneet.com","Engineer", testGithub);
  expect(engineeer.github).toBe(testGithub);
});

//check if the Egineer details are valid strings and numbers 
test('creates a Engineer  object', () => {
  const testGithub = "GitHubUser";
  const engineer = new Engineer("AK", 1, "avneet@avneet.com","Engineer", testGithub);

  expect(engineer.name).toEqual(expect.any(String));
  expect(engineer.name.length).toBeGreaterThan(0);
  expect(engineer.id).toEqual(expect.any(Number));
  expect(engineer.email).toEqual(expect.any(String));
  expect(engineer.email.length).toBeGreaterThan(0);
  expect(engineer.github).toEqual(expect.any(String));
  expect(engineer.github.length).toBeGreaterThan(0);
  
  
});

