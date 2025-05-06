import { addAppBar } from "/block/appBar.js";
import { addSidebar } from "/block/sidebar.js";
import { addReferenceList } from "/block/referenceList.js";
import { addTagList } from "/block/tagList.js";
import { addFooter } from "/block/footer.js";

// if there is no update date yet
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

export function initSinglePostPage({ postId, headings, references }) {
  addAppBar();
  addSidebar(headings);
  stylePostDetails();
  addTagList(postId);
  addReferenceList(references);
  addFooter();
}
