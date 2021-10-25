//자바 스크립트 호스트 환경이 제공하는 여러 함수를 사용하면 비동기 동작을 스케줄링 할 수 있다.

//setTimeout은 스케줄링에 사용되는 가장 대표적인 함수이다.

/*function LoadScript(src){
    let script = document.createElement('script');
    script.src = src;
    document.head.append(script);
}*/

//LoadScript(src)는 <script src="...">를 동적으로 만들고 이를 문서에 추가한다.

//위에 만들어진 loadScript(src) 사용법
// 해당 경로에 위치한 스크립트를 불러오고 실행
//LoadScript('/my/script.js')

//이때 스크립트는 비동기적으로 실행됨.

//로딩이 끝나자마자 이 스크립트를 사용해 무언가를 해야만 할때 아래와 같이한다.

//스크립트 로딩이 끝난 후 실행될 함수인 callback함수를 추가한다.(콜백 함수는 나중에 호출 할 함수를 의미한다.)

/*function loadScript(src, callback){
    let script = document.createElement('script');

    script.src =src;

    script.onload = () =>callback(script);

    document.head.append(script);

}
// 새롭게 불러온 스크립트에 있는 함수를 콜백 함수 안에서 호출하면 원하는대로 외부 스크립트 안의 함수를 사용 할 수 있다.

loadScript('/my/script.js',function()){
    newFunction(); // 함수 호출이 제대로 동작한다.
}*/

/*function loadScript(src, callback){
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(script);
    document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script=>{
    alert(`${script.src}가 로드 되었습니다.`);
    alert(_);
})*/

//콜백 기반 비동기 프로그래밍이라고 한다. 무언가를 비동기적으로 수행하는 함수는 함수 내 동작이 모두 처리도니 후 실행되어야 하는 함수가 들어갈 콜백을 인수로 반드시 제공해야한다.

//콜백 속 콜백

/*loadScript('/my/script.js', function(script) {

    alert(`${script.src}을 로딩했습니다. 이젠, 다음 스크립트를 로딩합시다.`);
  
    loadScript('/my/script2.js', function(script) {
      alert(`두 번째 스크립트를 성공적으로 로딩했습니다.`);
    });
  
  });*/

//여기서 하나 더 불러오고싶다면?

/*loadScript('/my/script.js', function(script) {

    loadScript('/my/script2.js', function(script) {
  
      loadScript('/my/script3.js', function(script) {
        // 세 스크립트 로딩이 끝난 후 실행됨
      });
  
    })
  
  });*/

  //에러 핸들링

/*
function loadScript(src, callback){
    let script = documnet.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`${src}를 불러오는 도중에 에러가 발생했습니다.`))

    document.head.append(script);
}
*/

//위에서 성공하면 callback(null, script) 실패시 callback(error)

/*loadScript('/my/script.js', function(error,script){
    if(error){
        //에러 처리
    }else{
        //스크립트 로딩이 성공적으로 끝남
    }
})*/

//위는 에러를 처리하는 방식 이며 이런 처리 방식을 오류 우선 콜백이라고 부른다.

//비동기 처리를 할때 한개 혹은 두개의 중첩 호출이있는경우네느 보기에도 나쁘지않지만 2개이상의 코드를 꼬리물기 형식으로 처리하면 콜백지옥에 빠진다


/*
loadScript('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // 모든 스크립트가 로딩된 후, 실행 흐름이 이어집니다. (*)
          }
        });

      }
    })
  }
});
*/

//위의 코드 개선하기

loadScript('1.js',step1);

function step1(error,script){
    if(error){
        hadleError(error)
    }else{
        loadScript('2.js',step2);
    }
}
function step2(error, script) {
    if (error) {
      handleError(error);
    } else {
      // ...
      loadScript('3.js', step3);
    }
  }
  
  function step3(error, script) {
    if (error) {
      handleError(error);
    } else {
      // 모든 스크립트가 로딩되면 다른 동작을 수행합니다. (*)
    }
  };

