const Employee = require("../lib/Employee");

test("Check if can create Employee instance", () => {
    const employee = new Employee(); //check if we can create the object of the class employee it should fail initially as no class/function is defined or created 
    expect(typeof employee).toBe("object");
  });

  test("Test if we can set name via constructor", () => {
    const testName = "Avneet";
    const employee = new Employee(testName);
    expect(employee.name).toBe(testName); //test fails if you use any other variable than name
  });


  test("Test if we can set id via constructor", () => {
    const testId = 1;
    const employee = new Employee("AK", testId);
    expect(employee.id).toBe(testId);
  });
  
  test("Test if we  set email id  via constructor", () => {
    const testEmail = "avneet@avneet.com";
    const employee = new Employee("AK", 1, testEmail);
    expect(employee.email).toBe(testEmail);
  });


  //can add this later:
  test('creates a employee  object', () => {
  const e = new Employee("AK,",1,"avneet@avneet.com");

  expect(e.name).toEqual(expect.any(String));
  expect(e.name.length).toBeGreaterThan(0);
  expect(e.id).toEqual(expect.any(Number));
  expect(e.email).toEqual(expect.any(String));
  expect(e.email.length).toBeGreaterThan(0);
  
});
