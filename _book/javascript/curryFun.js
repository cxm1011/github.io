function _add(a){
    return function(b){
        return function(c){
            return a+b+c;
        }
    }
}

console.log(_add(1)(2)(3));

console.log([4,5,6,7].slice(2,4));

function foo(x,y,z){
    console.log(arguments);
}

foo(2,3);