
// function foo(){
//     var a = 2;
//     function bar(){
//         console.log(a);
//     };
//     return bar;
// }
// var baz = foo();
// baz();

//每隔1秒输出6  大家共享一个i
// for(var i=0;i<=5;i++){
//     setTimeout(function(){
//         console.log(i)
//     },i*1000);
// }

//每隔1秒输出6  虽然有自己的作用域，但是大家共享一个i
// for(var i=0;i<=5;i++){
//     (function(){
//         setTimeout(function(){
//         console.log(i)
//     },i*1000)
//     })();
// }

//每隔1秒输出0到5.每个迭代都有新的作用域，并且该作用域中有一个正确的变量供我们访问
// for(var i=0;i<=5;i++){
//     (function(i){
//         setTimeout(function(){
//         console.log(i)
//     },i*1000)
//     })(i);
// }

//每隔1秒输出0到5.块级作用域和闭包联手。for循环中let声明都会有一个特殊的行为，这个行为指出变量在循环中不止被声明一次，每次迭代都会声明
for(let i=0;i<=5;i++){
    setTimeout(function(){
        console.log(i)
    },i*1000)  
}

