var args = process.argv; //입력을 받는곳
console.log(args);

console.log(args[2]); //입력을 해놓은 배열에서 값을 출력하는거.
console.log('A');
console.log('B');
if(args[2]==='1'){
    console.log('C1');
}else{
    console.log('C2');
}

console.log('D');