const onPaperObserved = () => {
  const papers  = [];
  papers.push(document.querySelector(".img-frame-wrapper"));
  papers.push(document.querySelector(".img-frame-wrapper-not-full-length"));
  papers.forEach(paper => {
    if (paper) {
      paper.classList.toggle("visible")
    }
  });
}