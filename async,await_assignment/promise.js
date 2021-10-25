//1번 과제
//1만 출력 두번째 resolve는 무시됨


//2번

function delay(ms){
    return new Promise(res=>setTimeout(res,ms));
}

delay(3000).then(()=>alert('3초후 실행'));

//3번 callback 과 마찬가지로 잘 모르겠음..