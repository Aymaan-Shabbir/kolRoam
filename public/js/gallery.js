var menuToggle = document.getElementById("menu-toggle");
var nleft = document.getElementById("nleft");
// var nright = document.getElementById('nright');
var nav = document.getElementById("nav");

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

// Update the visibility when resizing the window
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

AOS.init();

function refreshAOS() {
  AOS.refresh();
}

document.addEventListener("DOMContentLoaded", () => {
  // Restore like counts from local storage on page load
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const likeKey = card.querySelector(".like-count").getAttribute("id");
    const likeCountElement = document.getElementById(likeKey);
    const storedLikes = localStorage.getItem(likeKey);
    if (storedLikes !== null) {
      likeCountElement.textContent = storedLikes;
    }
  });
});

function toggleLike(imageContainer, likeCountId, starPopupId) {
  const likeCountElement = document.getElementById(likeCountId);
  const starPopup = document.getElementById(starPopupId);

  const currentLikes = parseInt(likeCountElement.textContent);
  likeCountElement.textContent = currentLikes + 1;

  // Store the updated like count in local storage
  const likeKey = likeCountElement.getAttribute("id");
  localStorage.setItem(likeKey, likeCountElement.textContent);

  starPopup.style.display = "block";

  // Remove star popup after 2 seconds
  setTimeout(() => {
    starPopup.style.display = "none";
  }, 2000);
}

function increaseLikes(likeCountId, starPopupId) {
  const likeCountElement = document.getElementById(likeCountId);
  const starPopup = document.getElementById(starPopupId);

  const currentLikes = parseInt(likeCountElement.textContent);
  likeCountElement.textContent = currentLikes + 1;

  // Store the updated like count in local storage
  const likeKey = likeCountElement.getAttribute("id");
  localStorage.setItem(likeKey, likeCountElement.textContent);

  starPopup.style.display = "block";

  // Remove star popup after 2 seconds
  setTimeout(() => {
    starPopup.style.display = "none";
  }, 2000);
}
