function stylePostDetails() {
  const post__detailsEl = document.querySelector(".post__details");
  const children = post__detailsEl.children;
  if (!children) {
    return;
  }
  for (let i = 0; i < children.length - 1; i++) {
    children[i].classList.add("post__detail_has-right-border");
  }
}
