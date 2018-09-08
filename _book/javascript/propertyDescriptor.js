var myObject = {
    a: 2
}
console.log(Object.getOwnPropertyDescriptor(myObject,"a"));
// { value: 2, writable: true, enumerable: true, configurable: true }
