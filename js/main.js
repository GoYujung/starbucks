// 스크롤 제어(스크롤 작업할때 많이 사용 됨 / _.throttle(함수, 시간추가(ex:300)))
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function () {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    // 배지 숨기기
    gsap.to(badgeEl, 0.6, { //요소, 지속시간, 옵션 
      opacity: 0,
      display: 'none'
    });  
    //상단으로 올라가는 버튼 보이기
      gsap.to(toTopEl, 0.2, {
        x: 0
      });
  } else {
  // 배지 보이기
    gsap.to(badgeEl, 0.6, { //요소, 지속시간, 옵션 
      opacity: 1,
      display: 'block'
  }); 
  //상단으로 올라가는 버튼 숨기기
    gsap.to(toTopEl, 0.2, { // 요소를 넣을 수도 있지만, 선택자도 넣을 수 있음
      x: 100
    });
  }
}, 300));

toTopEl.addEventListener('click', function () {
  gsap.to(window, 0.7, {
    scrollTo: 0
  });
});

//애니메이션 
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  //요소, 지속시간, 옵션
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * 0.7,
    opacity: 1
  });
});

//수직 슬라이드 스와이퍼 구현 
//new Swiper(선택자, 옵션을 넣어 구현)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});
//수평 슬라이드 스와이퍼 구현 (direction: 'horizontal': 기본값이 있어서 작성 할 필요 없음)
new Swiper('.promotion .swiper-container', {
  slidesPerView : 3,   // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10,   // 슬라이드 사이의 여백(픽셀)
  centeredSlides: true,  //처음에 보여지는 슬라이드가 가운데 이미지가 보여지게 하기
  loop: true,
  // autoplay: {
  //   delay: 500
  // }
  pagination: {
    el: '.promotion .swiper-pagination',  //페이지 번호 요소 선택자
    clickable: true  //사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});
new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});


//toggle-promoton
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion  // 느낌표가 붙으면 특정 변수의 값을 지속적으로 반대의 값을 반환 
  if (isHidePromotion) {
    // 숨김 처리
  promotionEl.classList.add('hide');
  } else {
    // 보임 처리
    promotionEl.classList.remove('hide');
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
function floatingObject(selector, delay, size) {
  gsap.to(selector, random(1.5, 2.5),      // 애니메이션 동작 시간
  {  //옵션
      y: size,    
      repeat: -1,    //반복(-1은 무한반복)
      yoyo: true,    // 한번 진행 후 다시 돌아 올 수 있게 함
      ease: Power1.easeInOut,
      delay: random(0, delay)
  });
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', 0.5, 15);
floatingObject('.floating3', 1.5, 20);

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, //보여짐의 여부를 감시할 요소를 지정
      triggerHook: 0.8  //감시하는 요소가 뷰포트 지점에서 걸리면 밑에 있는 매소드가 실행이 됨
    })
    .setClassToggle(spyEl,'show')
    .addTo(new ScrollMagic.Controller());
});

