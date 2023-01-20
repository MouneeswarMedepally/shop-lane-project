let navBarSmallScreens = document.getElementsByClassName(
  "nav-bar-small-screens"
);
function onMenuBarClick(click) {
  let smallNav = document.getElementsByClassName("small-nav");
  let hamLines = document.getElementsByClassName("ham-line");
  let mainTag = document.getElementsByTagName("main");
  if (smallNav[0].style.display == "flex") {
    smallNav[0].style.display = "none";
    hamLines[0].style.transform = "translate(0%, 0px) rotate(0deg)";
    hamLines[1].style.transform = "translate(0%, 0px) rotate(0deg)";
  } else {
    smallNav[0].style.display = "flex";
    hamLines[0].style.transform = "translate(0%, 5px) rotate(45deg)";
    hamLines[1].style.transform = "translate(0%, -7px) rotate(-45deg)";
  }
  function onBodyClickSmallNav(e) {
    if (smallNav[0].style.display == "flex") {
      smallNav[0].style.display = "none";
      hamLines[0].style.transform = "translate(0%, 0px) rotate(0deg)";
      hamLines[1].style.transform = "translate(0%, 0px) rotate(0deg)";
    }
  }
  mainTag[0].addEventListener("click", onBodyClickSmallNav);
}
navBarSmallScreens[0].addEventListener("click", onMenuBarClick);

let laneBeforeDiv = document.getElementsByClassName("lane-before");
let laneAfterDiv = document.getElementsByClassName("lane-after");
let mediaMaxWidth1100 = window.matchMedia("(max-width:1100px");
let searchBar = document.getElementsByClassName("search-bar");
function mediaMaxWidth1100px(mediaMaxWidth1100) {
  if (mediaMaxWidth1100.matches) {
    function searchBarInsert() {
      document.body.insertBefore(searchBar[0], document.body.children[1]);
    }
    let mediaMaxWidth330 = window.matchMedia("(max-width:330px");
    let mediaMinwidth = window.matchMedia(
      "(min-width:330px) and (max-width:1100px)"
    );
    if (mediaMaxWidth330.matches) {
      laneBeforeDiv[0].classList.add("lane-before-330");
      laneAfterDiv[0].classList.add("lane-after-330");
    } else {
      laneBeforeDiv[0].classList.remove("lane-before-330");
      laneAfterDiv[0].classList.remove("lane-after-330");
    }
    if (mediaMinwidth.matches) {
      laneBeforeDiv[0].classList.add("lane-before-1100");
      laneAfterDiv[0].classList.add("lane-after-1100");
    } else {
      laneBeforeDiv[0].classList.remove("lane-before-1100");
      laneAfterDiv[0].classList.remove("lane-after-1100");
    }
    document.body.style.boxShadow = "inset 0px 5px 10px -2px lawngreen";
    let header = document.getElementsByClassName("header-class");
    header[0].style.boxShadow = "0px 5px 10px -5px lawngreen";
    let footer = document.getElementsByClassName("footer-class");
    footer[0].style.boxShadow = "inset 0px -3px 10px -2px lawngreen";
  }
}

setTimeout(mediaMaxWidth1100px(mediaMaxWidth1100), 1000);
function searchBarInsert() {
  if (mediaMaxWidth1100.matches) {
    document.body.insertBefore(searchBar[0], document.body.children[1]);
  } else {
    let navBar = document.getElementsByClassName("nav-bar");
    navBar[0].insertBefore(searchBar[0], navBar[0].children[1]);
  }
}
