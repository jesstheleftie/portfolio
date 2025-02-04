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
    //scroll to top
    // uxPagesContainer.scrollTo({
    //   top: top,
    //   behavior: "smooth",
    // });
  }
};

const initButtons = () => {
  let navButtonArray = document.querySelectorAll(".eventButton");
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

const scrollEvent = (elementId, top, target, style = "auto") => {
  let appContainer = document.getElementById("appContainer");
  const element = document.getElementById(elementId);
  element.addEventListener("click", function () {
    if (
      element.classList.contains("about") ||
      element.classList.contains("myLogo") ||
      element.classList.contains("backToTop")
    ) {
      // appContainer.scrollTo({
      //   top: 30,
      //   behavior: "smooth",
      // });
      setTimeout(() => {
        appContainer.scrollTo({
          top: 0,
          behavior: style,
        });
      }, 100);
      // setTimeout(() => {
      //   appContainer.scrollTo({
      //     top: 0,
      //     behavior: "smooth",
      //   });
      // }, 300);
    }
    // Normal but without target, goes to parameter 'top'
    else if (!target) {
      appContainer.scrollTo({
        top: top,
        behavior: style,
      });
    }
    // with target element specified
    else {
      console.log("target", target);
      document
        .getElementById(target)
        .scrollIntoView({ block: "start", behavior: "smooth" });
    }
  });
};

document.addEventListener("mousemove", (e) => {
  let screenWidth = window.innerWidth;
  let mouseX = e.clientX;

  let percentage = ((screenWidth - mouseX) / screenWidth) * 100; // Mouse position as percentage of screen width

  document.querySelector(".cartoonImage").style.clipPath = `inset(0 ${
    100 - percentage
  }% 0 0)`;
  document.querySelector(
    ".realImage"
  ).style.clipPath = `inset(0 0 0 ${percentage}%)`;

  // Opacity logic: Both full between 33% - 66%
  let leftOpacity = percentage >= 52 ? Math.max(0, (100 - percentage) / 52) : 1;
  let rightOpacity = percentage <= 48 ? Math.max(0, percentage / 48) : 1;

  document.querySelector(".rightOverlay").style.opacity = leftOpacity;
  document.querySelector(".leftOverlay").style.opacity = rightOpacity;
});

scrollEvent("myLogo", 0, null, "smooth");
scrollEvent("navButton_home", 0, null, "auto");
scrollEvent("navButton_uxPage1", 0, null, "smooth");
scrollEvent("navButton_uxPage2", 0, null, "smooth");
scrollEvent("navButton_uxPage3", 0, null, "smooth");
scrollEvent("navButton_uxPage4", 0, null, "smooth");
scrollEvent("cartoonHeroText", 0, "userExperienceContainer", "smooth");
scrollEvent("realHeroText", 0, "webDevProjectContainer", "smooth");
scrollEvent("navButton_about", 0, "blurpContainer", "smooth");
scrollEvent("navButton_work", 0, "webDevSection", "smooth");
