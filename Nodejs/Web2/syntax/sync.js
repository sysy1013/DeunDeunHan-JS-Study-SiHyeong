var fs = require('fs');
/*
console.log('A');
var result = fs.readFileSync('./sample.txt', 'utf-8'); // 동기적 명령
console.log(result);
console.log('B');
*/

console.log('A');
var result = fs.readFile('./sample.txt', 'utf-8', (err,result)=>{
    console.log(result);
}); // 비동기적 명령
console.log('C');