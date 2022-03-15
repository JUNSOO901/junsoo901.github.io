'use strict'

// make navbar transparent when it is on the top
// 네비바가 상단에 있을때만 투명화
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar__dark');
    } else {
        navbar.classList.remove('navbar__dark');
    }
});

// handle scrolling when tapping on the navbar menu
// 누르면 그 위치로 부드럽게 스크롤링 scrollIntoView() 사용.
const navbarMenu = document.querySelector('.navbar__menu');
const navbarMenuitem = document.querySelector('.navbar__menu__item');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    // 목록 으로 이동(클릭)시 스몰버전일시 네비바가 사라짐
    navbarMenu.classList.remove('open'); 
    scrollIntoView(link)
// navbar botton 'click' in the active     
    const navbarMenuitem_active = document.querySelector('.navbar__menu__item.active');
    navbarMenuitem_active.classList.remove('active');
    event.target.classList.add('active');
})

// navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toogle-btn');
navbarToggleBtn.addEventListener('click', ()=> {
    navbarMenu.classList.toggle('open');
});

// handle click on "contact me" button on home
const contactMe = document.querySelector('.home__contact');
contactMe.addEventListener('click', () => {
    scrollIntoView('#contact')
});

// make home slowly fade to transparent as the window scrolls down
// 스크롤을 내릴수록 홈의 컨텐츠가 투명화

const home = document.querySelector('.home_container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight*1;

// 스크롤링시 해당하는 위치의 네비바의 "open" 클래스를 추가
})


// show arrow up button when scrolling down
// 아래로 스크롤시 맨위 버튼이 보여짐
const ArrowUp = document.querySelector('.Arrow-up');
document.addEventListener('scroll', ()=> {
    if (window.scrollY / homeHeight / 2) {
        ArrowUp.classList.add('visible');
    }else {
        ArrowUp.classList.remove('visible');
    }
})

// Handle click on the "Arrow up" button
// 맨위 버튼을 누를시 "#home"으로 이동
ArrowUp.addEventListener('click', () => {
    scrollIntoView('#home')
});

// project filter selection
// 프로젝트 카테고리 탭 필터링 & 애니메이션
const workcategories = document.querySelector('.work__categories');
const project = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workcategories.addEventListener('click', (event) => {
    const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter ;
    if(filter == null) {
        return;
    }
// 카테고리 탭 "Selection"
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    event.target.classList.add('selected');
// 카테고리 탭 필터링 전환 애니메이션
    project.classList.add('anim-out');
    setTimeout(() => {
        projects.forEach((project) => {
            if (filter ==='*' || filter === project.dataset.type) {
                project.classList.remove('visible')
            }else {
                project.classList.add('visible')
            }
        });
        project.classList.remove('anim-out');
    }, 300)
})


// 1. 모든 섹션 요소들을 가지고 온다.
// 2. IntersctionObserver를 이용해서 모든 섹션요소들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 한다.

const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact',
  ];
  const sections = sectionIds.map((id) => document.querySelector(id));
  const navItems = sectionIds.map((id) =>
    document.querySelector(`[data-link="${id}"]`)
  );
  
  let selectedNavIndex = 0;
  let selectedNavItem = navItems[0];
  function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
  }
  
  function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
  }

  window.addEventListener('load', () => {

    selectNavItem(navItems[selectedNavIdx]);
  
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  };
  
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting && entry.intersectionRatio > 0) {
        console.log('y');
        const index = sectionIds.indexOf(`#${entry.target.id}`);
        // 스크롤링이 아래로 되어서 페이지가 올라옴
        if (entry.boundingClientRect.y < 0) {
          selectedNavIndex = index + 1;
        } else {
          selectedNavIndex = index - 1;
        }
      }
    });
  };
  
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach((section) => observer.observe(section));
  
  window.addEventListener('wheel', () => {
    if (window.scrollY === 0) {
      selectedNavIndex = 0;
    } else if (
      window.scrollY + window.innerHeight ===
      document.body.clientHeight
    ) {
      selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
  });
  