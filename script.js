const navigateToPage = (targetPageId) => {
  document.querySelectorAll(".navPage").forEach((eachPage) => {
    eachPage.style.display = "none";
  });
  const targetPage = document.getElementById(targetPageId);
  if (targetPage) {
    targetPage.style.display = "block";
  }
  //Backbutton render
  if (targetPageId === "homePage") {
    uxPageBackButton.style.display = "none";
  } else {
    uxPageBackButton.style.display = "block";
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
