function toggleCategoryDisplay(category) {
  const categorySection = document.querySelector(`.${category}`);

  // Check if the category section is currently hidden
  if (
    categorySection.style.display === "none" ||
    getComputedStyle(categorySection).display === "none"
  ) {
    // Show the category section
    categorySection.style.display = "flex";
    categorySection.style.alignItems = "center";
    categorySection.style.justifyContent = "space-evenly";
    categorySection.style.flexWrap = "wrap";
    categorySection.style.gap = "50px";
  } else {
    // Hide the category section
    categorySection.style.display = "none";
  }
}

function toggleMap(cardNumber) {
  const mapContainer = document.getElementById(`mapContainer${cardNumber}`);
  const cardContent = document.querySelector(".card-content");
  const cardElement = document.querySelector(
    `[data-card-number="${cardNumber}"]`
  );
  if (!mapContainer) {
    console.error(`Map container not found for card number ${cardNumber}`);
    return;
  }

  // Check if the map container is currently hidden
  if (
    mapContainer.style.display === "none" ||
    getComputedStyle(mapContainer).display === "none"
  ) {
    // Show the map container
    mapContainer.style.display = "block";

    document.querySelector(
      `[data-card-number="${cardNumber}"] .toggle-map-btn`
    ).innerText = "Hide Map";
  } else {
    // Hide the map container
    mapContainer.style.display = "none";

    document.querySelector(
      `[data-card-number="${cardNumber}"] .toggle-map-btn`
    ).innerText = "Show Map";
  }
}

var menuToggle = document.getElementById("menu-toggle");
var nleft = document.getElementById("nleft");
var nright = document.getElementById("nright");
var nav = document.getElementById("nav");

menuToggle.addEventListener("click", function () {
  nleft.style.display =
    nleft.style.display === "none" || nleft.style.display === ""
      ? "flex"
      : "none";

  // If the menu is open, set flex direction to column for nleft and nright
  if (nleft.style.display === "flex") {
    nleft.style.flexDirection = "column";
    nleft.style.marginTop = "1vh";
    nleft.style.marginBottom = "1vh";

    nav.style.background = "#341818";
    menuToggle.style.marginRight = "1rem";
  } else {
    // If the menu is closed, reset flex direction to row for nleft and nright
    nleft.style.flexDirection = "row";
    nleft.style.marginTop = "0";
    nleft.style.marginBottom = "0";
    nav.style.background = "transparent";
    menuToggle.style.marginRight = "0";
  }
});

// Update the visibility when resizing the window
window.addEventListener("resize", function () {
  if (window.innerWidth > 600) {
    nleft.style.display = "flex";
  } else {
    nleft.style.display = "none";

    menuToggle.style.marginRight = "0";
  }
});

AOS.init();

function refreshAOS() {
  AOS.refresh();
}
