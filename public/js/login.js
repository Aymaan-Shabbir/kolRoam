console.log("active login");
var menuToggle = document.getElementById("menu-toggle");
var nleft = document.getElementById("nleft");
// var nright = document.getElementById('nright');
var nav = document.getElementById("nav");
console.log("active login");
menuToggle.addEventListener("click", function () {
  nleft.style.display =
    nleft.style.display === "none" || nleft.style.display === ""
      ? "flex"
      : "none";
  // nright.style.display = (nright.style.display === 'none' || nright.style.display === '') ? 'flex' : 'none';

  // If the menu is open, set flex direction to column for nleft and nright
  if (nleft.style.display === "flex") {
    nleft.style.flexDirection = "column";
    nleft.style.marginTop = "1rem";
    // nright.style.flexDirection = 'column';
    nav.style.background = "#004141";
    menuToggle.style.marginRight = "1rem";
  } else {
    // If the menu is closed, reset flex direction to row for nleft and nright
    nleft.style.flexDirection = "row";
    // nright.style.flexDirection = 'row';
    nleft.style.marginTop = "0";
    nav.style.background = "transparent";
    menuToggle.style.marginRight = "0";
  }
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 600) {
    nleft.style.display = "flex";
    // nright.style.display = 'flex';
  } else {
    nleft.style.display = "none";
    // nright.style.display = 'none';
    menuToggle.style.marginRight = "0";
  }
});
