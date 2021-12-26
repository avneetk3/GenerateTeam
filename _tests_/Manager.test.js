const Manager = require("../lib/Manager");

test("Check if can create Intern instance", () => {
    const manager   = new Manager(); //check if we can create the object of the class manager it should fail initially as no class/function is defined or created 
    expect(typeof manager).toBe("object");
  });

  test("Check if we can pass office number via constructor ", () => {
    const testOffice = 100;
    const manager = new Manager("AK", 1, "avneet@avneet.com", "Manager", testOffice);
    expect(manager.officeNumber).toBe(testOffice);
  });

  test('creates a Manager  object', () => {
    const manager = new Manager("AK", 1, "avneet@avneet.com", "Manager", 100);
    expect(manager.name).toEqual(expect.any(String));
    expect(manager.name.length).toBeGreaterThan(0);
    expect(manager.id).toEqual(expect.any(Number));
    expect(manager.email).toEqual(expect.any(String));
    expect(manager.email.length).toBeGreaterThan(0);
    expect(manager.officeNumber).toEqual(expect.any(Number));
    
  });
  