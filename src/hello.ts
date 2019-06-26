class Student {
  fullName: string;
  constructor(public firstName: string, public middle: string, public lastName: string) {
    this.fullName = firstName + " " + middle + " " + lastName;
  }
}
// 接口描述拥有字段的对象
interface Person {
  firstName: string;
  lastName: string;
}
function greeter(person:Person) {
  console.log('hello ' + person.firstName + person.lastName);
}
let user: Person = { firstName: 'qiu', lastName: 'ze'};
let student = new Student('qiu', 'hh', 'ze');
// 类型注释
function sayHello(name: string) {
  greeter(user);
  greeter(student);
  console.log('hello ' + name);
}
// class Student {
//   fullName: string;
//   constructor(public firstName: string, public middleInitial: string, public lastName: string) {
//       this.fullName = firstName + " " + middleInitial + " " + lastName;
//   }
// }

// interface Person {
//   firstName: string;
//   lastName: string;
// }

// function greeter(person : Person) {
//   console.log("Hello, " + person.firstName + " " + person.lastName);
// }

// let user = new Student("Jane", "M.", "User");

// function sayHello(name: string) {
//   greeter(user);
//   console.log('hello ' + name);
// }
export default sayHello;