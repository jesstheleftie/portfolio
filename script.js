const navigateToPage = (targetPageId) => {
  document.querySelectorAll(".navPage").forEach((eachPage) => {
    eachPage.style.display = "none";
  });
  const targetPage = document.getElementById(targetPageId);
  if (targetPage) {
    targetPage.style.display = "block";
  }
  //Backbutton render
  const uxPageBackButton = document.getElementById("uxPageBackButton");
  if (targetPageId === "homePage") {
    uxPageBackButton.style.display = "none";
  } else {
    uxPageBackButton.style.display = "block";
  }

  //UX Pages render
  const uxPagesContainer = document.getElementById("uxPagesContainer");
  if (targetPageId === "homePage") {
    uxPagesContainer.style.display = "none";
  } else {
    uxPagesContainer.style.display = "block";
  }
};

const initButtons = () => {
  let navButtonArray = document.querySelectorAll(".navButton");
  navButtonArray.forEach((eachElement) => {
    eachElement.addEventListener("click", (e) => {
      const targetPageId = eachElement.dataset.targetpageid;
      if (targetPageId) {
        navigateToPage(targetPageId);
      }
      const uxPageBackButton = document.getElementById("uxPageBackButton");
      uxPageBackButton.addEventListener("click", () => {
        navigateToPage("homePage");
      });
    });
  });
};

initButtons();
let appContainer = document.getElementById("appContainer");
let prevScrollpos = appContainer.scrollTop; // Use scrollTop instead of pageYOffset
let downAnchor = appContainer.scrollTop; // Initialize downAnchor with scrollTop value

appContainer.addEventListener("scroll", () => {
  let currentScrollPos = appContainer.scrollTop; // Get current scroll position

  console.log("prevScrollpos", prevScrollpos, "downAnchor", downAnchor);

  if (prevScrollpos >= currentScrollPos) {
    // Scrolling up
    // Show navbar
    document.getElementById("navBar").style = ""; // Reset any inline styles
    document.getElementById("navBar").classList.add("showNav");

    // Update downAnchor if scrolled past a certain point
    if (currentScrollPos < 0) {
      downAnchor = 0;
    } else {
      downAnchor = currentScrollPos;
    }
  } else if (currentScrollPos > downAnchor && currentScrollPos > 0) {
    // Scrolling down
    // Hide navbar if scrolling down past a certain point
    document.getElementById("navBar").classList.remove("showNav");
    document.getElementById("navBar").style.top = `-${
      currentScrollPos - downAnchor
    }px`;
  }

  // Update prevScrollpos to current scroll position
  prevScrollpos = currentScrollPos;
});
