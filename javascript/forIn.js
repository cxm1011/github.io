let arr = [1,0,1];
// 一直遍历
arr.forEach((val) => {
    console.log(val);  // 1 0 1
})

// 返回false停止
arr.every((val) => {
    console.log(val);  // 1
    return false;
})

// 返回true停止
arr.some((val) => {
    console.log(val);  // 1
    return true;
})
