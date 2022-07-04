let adsIntervalTimer;
let feedbackIntervalTimer;

window.addEventListener("DOMContentLoaded", () => {
  const API = "https://60d4611a61160900173cb070.mockapi.io/courses";

  //   check window size for mobile because in mobile some ui with no space.
  let windowSize = window.innerWidth;
  window.onresize = () => (windowSize = window.innerWidth);

  // Open popup
  const adsVideoBtn = document.querySelector("#ads-video-btn");
  const closeVideoBtn = document.querySelector("#close-video-btn");
  const popup = document.querySelector("#popup");
  const video = document.querySelector("video");

  popup.onclick = (e) => {
    if (e.target.tagName === "VIDEO") return;
    else {
      video.src = null;
      popup.classList.add("hidden");
    }
  };
  closeVideoBtn.onclick = () => {
    video.src = null;
    popup.classList.add("hidden");
  };
  adsVideoBtn.onclick = () => {
    popup.classList.remove("hidden");
    video.src = "assets/video/video_253.mp4";
    video.autoplay = true;
  };

  //   feedback slider
  const maxFeedback = 3;
  let feedbackStep = 0;
  const feedbackContainer = document.querySelector("#feedback-container");
  const feedbackBtnContainer = document.querySelector(
    "#feedback-btn-container"
  );
  const feedbackBtnList = feedbackBtnContainer.children;
  const feedbackXUnit =
    feedbackContainer.firstElementChild.getBoundingClientRect().width;
  let feedbackTranslated = 0;
  feedbackIntervalTimer = setInterval(() => {
    if (feedbackStep === maxFeedback - 1) {
      feedbackTranslated = 0;
      feedbackStep = 0;
    } else {
      ++feedbackStep;
    }
    for (let i = 0; i < feedbackBtnList.length; ++i) {
      if (i === feedbackStep) {
        feedbackBtnList[i].classList.add("bg-yellow");
        feedbackBtnList[i].classList.remove("bg-white");
      } else {
        feedbackBtnList[i].classList.remove("bg-yellow");
        feedbackBtnList[i].classList.add("bg-white");
      }
    }

    feedbackContainer.style.setProperty(
      "transform",
      `translateX(${feedbackTranslated + "px"})`
    );
    feedbackTranslated -= feedbackXUnit * 2 + 80;
  }, 3000);

  // ads slider
  let adsXUnit = 0;
  const adsContainer = document.querySelector(".ads-container");
  const adsBtnLeft = document.querySelector("#ads-btn-left");
  const adsBtnRight = document.querySelector("#ads-btn-right");
  const totalAdsSlide = adsContainer.children;
  let adsUnit = adsContainer.firstElementChild.getBoundingClientRect().width;
  let adsStep = 0;
  let adsTranslated = 0;

  adsBtnLeft.onclick = () => {
    if (adsStep === 0) return;
    console.log(adsStep);
    adsTranslated += adsUnit * 1;
    adsContainer.style.setProperty(
      "transform",
      `translateX(${adsTranslated + "px"})`
    );
    --adsStep;
  };
  adsBtnRight.onclick = () => {
    if (adsStep === 2) return;
    console.log(adsStep);
    adsTranslated += adsUnit * -1;
    adsContainer.style.setProperty(
      "transform",
      `translateX(${adsTranslated + "px"})`
    );
    ++adsStep;
  };

  // first step
  const translateElems = totalAdsSlide[0].querySelectorAll(
    "[data-translate=true]"
  );
  for (let node of translateElems) {
    node.classList.add("translate_back");
  }

  adsIntervalTimer = setInterval(() => {
    adsTranslated += adsUnit * -1;
    if (adsStep === 2) {
      adsTranslated = 0;
      adsStep = 0;
    } else {
      ++adsStep;
    }
    console.log(adsTranslated);
    adsContainer.style.setProperty(
      "transform",
      `translateX(${adsTranslated + "px"})`
    );
    for (let i = 0; i < 3; ++i) {
      if (i === adsStep) {
        const translateElems = totalAdsSlide[i].querySelectorAll(
          "[data-translate=true]"
        );
        for (let node of translateElems) {
          node.classList.add("translate_back");
        }
      } else {
        const translateElems = totalAdsSlide[i].querySelectorAll(
          "[data-translate=true]"
        );
        for (let node of translateElems) {
          node.classList.remove("translate_back");
        }
      }
    }
  }, 3000);

  const categoryBtnLeft = document.querySelector("#category-btn-left");
  const categoryBtnRight = document.querySelector("#category-btn-right");
  const categoryContainer = document.querySelector("#category-container");

  const firstList = categoryContainer.querySelectorAll("[data-list='1']");

  let categoryXUnit =
    categoryContainer.firstElementChild.getBoundingClientRect().width;
  let categoryTranslated = 0;
  let categoryStep = 1;
  categoryBtnLeft.onclick = () => {
    console.log(categoryTranslated);
    if (!categoryXUnit || Math.abs(categoryTranslated) === 0) return;
    if (windowSize <= 390) {
      categoryTranslated += categoryXUnit;
    } else {
      categoryTranslated += categoryXUnit + 20;
    }
    console.log(categoryTranslated);
    categoryContainer.style.setProperty(
      "transform",
      `translateX(${categoryTranslated + "px"})`
    );
    --categoryStep;
  };
  categoryBtnRight.onclick = () => {
    if (!categoryXUnit) return;
    if (windowSize <= 390)
      isLast = categoryContainer.children.length - categoryStep < 2;
    else isLast = categoryContainer.children.length - categoryStep < 3;
    if (!categoryXUnit) return;
    if (isLast) {
      // Run forever....
      // If we want translate it smoothly. We'll keep append items instead remove because removing items make ui work not as expected
      // Must to cloned node because js'll override node if existed
      const clonedNode = [];
      firstList.forEach((node) => {
        clonedNode.push(node.cloneNode(true));
      });
      categoryContainer.append(...clonedNode);
      isLast = false;
    }
    if (windowSize <= 390) {
      categoryTranslated -= categoryXUnit;
    } else categoryTranslated -= categoryXUnit + 20;
    categoryContainer.style.setProperty(
      "transform",
      `translateX(${categoryTranslated + "px"})`
    );
    ++categoryStep;
  };

  //   Mobile nav btn
  const navBtnMobile = document.querySelector("#nav-btn-mobile");
  const navMobile = document.querySelector("#nav-mobile");
  navBtnMobile.onclick = () => {
    navBtnMobile.classList.toggle("active");
    navMobile.classList.toggle("hidden");
  };

  //   Scroll to top
  const scrollBtnTop = document.querySelector("#scroll-btn-top");
  scrollBtnTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  //   Slide for courses
  const coursesContainer = document.querySelector("#courses-container");
  const courseBtnLeft = document.querySelector("#course-btn-left");
  const courseBtnRight = document.querySelector("#course-btn-right");

  let coursesTranslated = 0;
  let courseXUnit = 0;
  let length = 0;

  const courseTemplate = (course) => {
    const template = `<div
                         class="laptop:flex-[1_1_33%] laptop:max-w-[33%] min-w-full laptop:min-w-[calc(33%-14px)] bg-white rounded-md overflow-hidden">
                         <div class="relative w-full h-full overflow-hidden">
                             <img class="w-full h-full object-center object-cover transition-transform duration-500 hover:scale-110"
                                 src=${course.image} referrerpolicy="no-referrer" alt="T">
                             <!-- For beginner -->
                             <div class="absolute left-3 top-3  rounded bg-primary grid place-items-center">
                                 <span
                                     class="text-white font-bold inline-block px-3 py-1 text-sm">${course.level}</span>
                             </div>
                             <!-- Bookmark -->
                             <div
                                 class="absolute right-3 top-3  rounded bg-primary grid place-items-center bg-white rounded text-primary p-2 text-lg">
                                 <i class="fa fa-bookmark-o"></i>
                             </div>
                         </div>
                         <div class="p-[25px]">
                             <div class="pb-3">
                                 <div class="flex justify-start items-center gap-x-4 mt-3">
                                     <ul
                                         class="flex justify-center items-center gap-x-1 text-sm text-yellow">
                                         <li><i class="fa fa-star"></i></li>
                                         <li><i class="fa fa-star"></i></li>
                                         <li><i class="fa fa-star"></i></li>
                                         <li><i class="fa fa-star"></i></li>
                                         <li><i class="fa fa-star"></i></li>
                                     </ul>
                                     <span class="text-black text-[13px]">${course.rate} (${course.rate_quantity})</span>
                                 </div>
                                 <h4
                                     class="text-primary font-semibold mt-4 text-2xl transition-colors hover:text-yellow  duration-500 cursor-pointer">
                                     ${course.name}</h4>
                             </div>
                             <div class="flex justify-start items-center gap-x-5 text-sm text-[#8a8a8a]">
                                 <div class="flex justify-center items-center gap-x-1"><i
                                         class="fa fa-user-o"></i><span>${course.total_enrolled}</span>
                                 </div>
                                 <div class="flex justify-center items-center gap-x-1"><i
                                         class="fa fa-clock-o"></i><span>${course.duration}</span>
                                 </div>
                             </div>
                             <div class="flex justify-between items-center mt-6">
                                 <div class="flex justify-between items-center gap-x-1">
                                     <div class="w-7 h-7 rounded-full overflow-hidden mr-3"><img
                                             class="w-full h-full"
                                             src="/assets/images/image_icon/teacher_1.jpg" alt="T"></div>
                                     <span class="font-normal text-black text-sm">by</span>
                                     <p class="font-bold text-primary text-[15px]">${course.teacher}</p>
                                     <span class="font-normal text-black text-sm">in</span>
                                     <span class="font-bold text-primary text-[15px]">${course.categories}</span>
                                 </div>
                             </div>
                         </div>
                         <div class=" w-full flex justify-between items-center border-t border-[#cecece] px-8
                                         py-3">
                             <span class="text-sm font-semibold text-black">Free</span>
                             <div class="">
                                 <i class="text-lg text-yellow fa fa-cart-arrow-down"></i>
                                 <span class="text-sm font-semibold text-black">Get
                                     Enrolled</span>
                             </div>
                         </div>
                    </div>`;
    return template;
  };

  const fetchCourses = async () => {
    const response = await fetch(API, { method: "GET" });
    if (!response) throw new Error("Fetching courses failed");
    const data = await response.json();
    if (!data) throw new Error("Fetching courses failed");
    length = data.length;
    Array.isArray(data) &&
      data.forEach((course) => {
        const template = courseTemplate(course);
        coursesContainer.innerHTML += template;
      });
  };
  fetchCourses()
    .then((_) => {
      courseXUnit =
        coursesContainer.firstElementChild.getBoundingClientRect().width;
    })
    .catch(alert);

  let nextStep = 0;
  courseBtnLeft.onclick = () => {
    if (!courseXUnit || Math.abs(coursesTranslated) === 0) return;
    // for ip 12
    if (windowSize <= 390) {
      coursesTranslated += courseXUnit;
    } else coursesTranslated += courseXUnit + 28;
    console.log(coursesTranslated);
    coursesContainer.style.setProperty(
      "transform",
      `translateX(${coursesTranslated + "px"})`
    );
    --nextStep;
  };

  courseBtnRight.onclick = () => {
    let isLast;
    console.log(nextStep);
    if (windowSize <= 390) isLast = length - nextStep > 2;
    else isLast = length - nextStep > 3;
    if (!courseXUnit || !isLast) return;
    if (windowSize <= 390) coursesTranslated -= courseXUnit;
    else coursesTranslated -= courseXUnit + 28;

    // for ip 12
    coursesContainer.style.setProperty(
      "transform",
      `translateX(${coursesTranslated + "px"})`
    );
    ++nextStep;
  };
});

window.onbeforeunload = () => {
  clearInterval(feedbackIntervalTimer);
  clearInterval(adsIntervalTimer);
};
