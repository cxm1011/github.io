# 第一部分  作用域和闭包
1.LHS  RHS
LHS: 赋值操作的目标是谁
RHS: 谁是赋值操作的源头
区分LHS和RHS是因为左变量还没有声明(任何情况都找不到该变量)的情况下，这两种查询的行为是不一样的
如果某一变量是未声明的变量，则
RHS: 抛出ReferenceError异常
LHS: 当程序运行在非严格模式下，则其会在全局作用域中创建一个该名称的变量

2.函数声明和函数表达式
区别: 它们的名称绑定则何处
函数声明： function  foo() {}  foo被绑定在所在的作用域中，可以直接通过foo()调用
函数表达式: (function foo(){...})()   foo被绑定在函数表达式自身的函数中而不是所在的作用域中，即foo只能在...所代表的位置中访问，外部
作用域不行。

3.提升
代码：
a = 2;
var a;
console.log(a);
最后输出2.
原因: js中包括变量和函数在内的所有声明都会在任何代码执行前首先被处理
因此  var a = 2;这段代码会被这样两步处理： var a; 和 a = 2;  第一个定义是在编译阶段进行，第二个赋值则是在执行阶段执行。因此上面的代码会
按如下形式处理：
var a;
a = 2;
console.log(a);
这样就感觉变量和函数声明从它们在代码中出现的位置被“移动”到了最上面，这个过程叫提升。
eg:
console.log(a);
var a = 2;
会输出： undefined
因为代码实际处理流程：
var a;
console.log(a);
a = 2;

函数声明会提升，函数表达式则不会
bar();  // typeError   bar()由于对undefined值进行函数调用而导致非法操作，因此抛出typeError异常
var bar = function foo(){
    console.log('1');
}

foo();  // ReferenceError:
var bar = function foo(){
    console.log('1');
}

4.闭包

function foo(){
    var a = 2;
    function bar(){
        console.log(a);
    };
    return bar;
}
var baz = foo();
baz();

foo()执行后，foo整个内部作用域不会被销毁。原因是bar还在引用着foo的内部作用域。这个引用叫闭包

5.箭头函数
目的；放弃所有this绑定的规则，取而代之的是用当前的词法作用域覆盖了this本来的值
箭头函数的this绑定无法修改，new也不行
eg:
function foo() {
    return (a) => {
        console.log(this.a);
    }
}
var obj1 = {
    a : 2
}
var obj2 = {
    a : 3
}
var bar = foo.call(obj1);
bar.call(obj2); // 2,而不是3.foo中的this已经绑定到obj1了,不会再更改为obj2

6.this
为什么使用this?
this提供了一种更优雅的方式来隐式传递一个对象的引用，因此可以将API设计的更加简洁且易于复用

this是什么？
this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式
当一个函数被调用时，会创建一个活动记录(执行上下文).这个记录会包含函数在哪里被调用，函数的调用方式，传入的参数等信息。this就是这个记录
的一个属性。this实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用。

this绑定规则
1）默认绑定
只有在非strict mode模式下，默认绑定才绑定到全局对象。在严格模式下则不会使用默认绑定
2）隐式绑定
调用位置的上下文。
eg:
function foo(){
    console.log(this.a);
}
var obj = {
    a: 42;
    foo: foo;
}
var obj2 = {
    a: 420;
    obj:obj;
}
obj.foo();   //42
obj2.obj.foo(); // 42
对象属性引用链只有上一层或者最后一层在调用位置中起作用

3)显示绑定
call  apply bind

4)new 绑定
使用new会执行以下操作：
1)创建一个全新的对象
2)这个新对象会被执行prototype连接
3)这个新对象会绑定到函数调用的this
4)如果没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象

优先级：
new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定


7.给数组添加属性
var arr = ['foo',42,'bar'];
arr.baz = 'baz';
console.log(arr.length);  // 3 数组长度不变
arr.push('ab');
console.log(arr.length);  // 4
// 给数组添加属性，属性名是个数字字符串，它会变为数字下标，同时改变数组的长度
arr['4'] = 'arr4';
console.log(arr.length);   // 5


8.属性描述符（propertyDescriptor.js）

var myObject = {
    a: 2
}
console.log(Object.getOwnPropertyDescriptor(myObject,"a"));
// { value: 2, writable: true, enumerable: true, configurable: true }
设置属性:
Object.defineProperty(myObject,"a",{

})
writable: 决定是否可以修改属性的值
configurable: 为true时才可以使用defineProperty()方法来修改属性描述符
enumerable: 控制对象是否可以出现在属性的枚举中

9.判断一个属性是否在对象中
1） “a” in myObject
2) myObject.hasOwnProperty('a')
区别： in操作符会检查属性是否在对象及其prototype原型链中，相比之下，hasOwnProperty()只会检查属性是否在myObject中
in 操作符是用来检查属性名是否存在，所以  4 in  [2,4,6] 返回的是false.因为该数组中的属性名只有0，1，2

Object.keys()  会返回一个数组,包含所有可枚举属性
Object.getOwnPropertyNames()  会返回一个数组，包含所有属性，无论它们是否可枚举

10.for in循环(详见fooIn.js)
forEach : 全部遍历
every : 返回false停止
some: 返回true停止

