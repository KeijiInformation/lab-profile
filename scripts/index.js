/////////////////////////////////////////////////////
// 要素が画面に入ったときにクラスを付与する処理関係
/////////////////////////////////////////////////////
/**
 * 要素の絶対y座標とwindowのスクロール分の値を比較する関数
 * @param {HTMLElement} elem 対象となるElement
 * @param {number?} scrollMargin スクロール分の値のオフセット
 * @returns {number} 負: elem < scroll, 0: elem === scroll, 正: elem > scroll
 */
const compareElemPositionYWithScrollY = (elem, scrollMargin) => {
  scrollMargin = scrollMargin || window.innerHeight / 1.8;
  /** スクロール量 */
  const scrollY = window.scrollY;
  /** 対象要素の絶対Y座標 */
  const targetPositionAbsY = elem.getBoundingClientRect().top + scrollY;
  return targetPositionAbsY - (scrollY + scrollMargin);
}

/**
 * 画面に要素が入っているかどうかでクラス名をトグルする関数
 * @param {string} className 付与するクラス名
 * @param {HTMLElement} basisElem 座標の基準となるElement
 * @param {HTMLElement[]} targetElements クラス付与の対象となるElement配列
 * @param {number?} scrollMargin 画面が要素に入った判定をする際のオフセット
 */
const toggleClassToElementInWindow = (className, basisElem, targetElements, scrollMargin) => {
  if (compareElemPositionYWithScrollY(basisElem, scrollMargin) <= 0) {
    targetElements.forEach(targetElem => {
      targetElem.classList.add(className);
    });
  } else {
    targetElements.forEach(targetElem => {
      targetElem.classList.remove(className);
    });
  }
}

// 対象要素の取得
const imgFrameElements = Array.from(document.querySelectorAll(".section-wrapper:not(.hobby-section-wrapper) .img-frame-wrapper"));
document.querySelectorAll(".section-wrapper:not(.hobby-section-wrapper) .img-frame-wrapper-not-full-length").forEach(elem => {
  imgFrameElements.push(elem);
});
const hobbyImgFramesWrapper = document.querySelector(".hobby-image-frames-wrapper");
const hobbyImgFrames = Array.from(document.querySelectorAll(".hobby-section-wrapper .img-frame-wrapper"));
const accessSectionContent = document.querySelector(".access-section-wrapper .section-content");
const footerLinksListWrapper = document.querySelector("footer .links-list");

// イベントの登録
window.addEventListener("scroll", () => {
  imgFrameElements.forEach(elem => {
    toggleClassToElementInWindow("visible", elem, [elem]);
  });
  toggleClassToElementInWindow("visible", hobbyImgFramesWrapper, hobbyImgFrames);
  toggleClassToElementInWindow("visible", accessSectionContent, [accessSectionContent], window.innerHeight / 0.9);
  toggleClassToElementInWindow("visible", footerLinksListWrapper, [footerLinksListWrapper], window.innerHeight / 1.1);
});



/////////////////////////////////////////////////////
// first viewの表示アニメーション関係
/////////////////////////////////////////////////////
const firstViewMainText  = document.querySelector(".first-view-wrapper .text-wrapper .name");
const firstViewDelimiter = document.querySelector(".first-view-wrapper .text-wrapper img");
const firstViewSubText   = document.querySelector(".first-view-wrapper .text-wrapper .sub-text");
let timeout = 500;

/**
 * first viewのtext contentの表示アニメーションを実行する関数
*/
const firstViewTextAppear = () => {
  const mainTextFull = "Keiji Itakura";
  const subTextFull  = "~ Welcome to my page ~";

  for (let i = 0; i < mainTextFull.length; i++) {
    const mainTextChar = mainTextFull[i];
    setTimeout(() => {
      firstViewMainText.textContent = firstViewMainText.textContent.split("|")[0];
      firstViewMainText.textContent += mainTextChar;
      firstViewMainText.textContent += "|";
    }, timeout);
    timeout += 100;
  }

  timeout += 100;
  setTimeout(() => {
    firstViewMainText.textContent = firstViewMainText.textContent.split("|")[0];
    firstViewSubText.textContent = "|";
  }, timeout);

  timeout += 500;

  for (let i = 0; i < subTextFull.length; i++) {
    const subTextChar = subTextFull[i];
    setTimeout(() => {
      firstViewSubText.textContent = firstViewSubText.textContent.split("|")[0];
      firstViewSubText.textContent += subTextChar;
      firstViewSubText.textContent += "|";
    }, timeout);
    timeout += 100;
  }

  timeout += 100;
  setTimeout(() => {
    firstViewSubText.textContent = firstViewSubText.textContent.split("|")[0];
  }, timeout);

  timeout += 500;
  setTimeout(() => {
    firstViewDelimiter.classList.add("visible");
  }, timeout);
}

/**
 * first viewのリンク一覧のアイコンおよびテキストをアニメーションさせる関数
*/
const firstViewLinksAnimation = () => {
  timeout += 1000;
  setTimeout(() => {
    const linksWrapperElem = document.querySelector(".first-view-wrapper .links-wrapper");
    linksWrapperElem.classList.toggle("visible");
  }, timeout);

  timeout += 1350;
  setTimeout(() => {
    const icons = document.querySelectorAll(".first-view-wrapper .links-wrapper .links-list .link div");
    icons.forEach(icon => {
      icon.classList.toggle("visible");
    });
  }, timeout);

  timeout += 700;
  setTimeout(() => {
    const linkTexts = document.querySelectorAll(".first-view-wrapper .links-wrapper .links-list .link span");
    linkTexts.forEach(linkText => {
      linkText.classList.add("visible");
    });
  }, timeout);
}

firstViewTextAppear();
firstViewLinksAnimation();


/////////////////////////////////////////////////////
// ページ内移動がスムーズにスクロールするようにする関係
/////////////////////////////////////////////////////
/**
 * 対象の要素へスムーズにスクロールする関数
 * @param {string} targetElemId 対象要素のID
*/
const smoothScrollTo = (targetElemId) => {
  const targetElem = document.querySelector(`#${targetElemId}`);
  if (targetElem) {
    window.scrollTo({
      top: targetElem.getBoundingClientRect().top + window.scrollY - 16,
      behavior: "smooth",
    });
  }
}

// 対象にイベントを登録
const firstViewLinkElems = document.querySelectorAll(".first-view-wrapper .links-wrapper .links-list .link");
const footerLinkElems = document.querySelectorAll("footer .links-list .link");
footerLinkElems.forEach(linkElem => {
  const targetId = linkElem.classList[1].split("_").pop();
  linkElem.addEventListener("click", () => smoothScrollTo(targetId));
  linkElem.addEventListener("click", () => smoothScrollTo(targetId));
});
firstViewLinkElems.forEach(linkElem => {
  const targetId = linkElem.classList[1].split("_").pop();
  linkElem.addEventListener("click", () => smoothScrollTo(targetId));
  linkElem.addEventListener("click", () => smoothScrollTo(targetId));
});
