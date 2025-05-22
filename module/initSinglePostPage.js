import { addAppBar } from "/block/appBar.js";
import { addSidebar } from "/block/sidebar.js";
import { addReferenceList } from "/block/referenceList.js";
import { addTagList } from "/block/tagList.js";
import { addFooter } from "/block/footer.js";
import { updateDocumentTitle } from "/module/updateDocumentTitle.js";

function getDateLocaleStr(dateStr) {
  const date = new Date(dateStr);
  return `${date.toLocaleString("default", {
    month: "long",
  })} ${date.getDate()}, ${date.getFullYear()}`;
}

function updatePostDetails(postId) {
  const post__detailsEl = document.querySelector(".post__details");
  Promise.all([
    fetch("/data/post.json").then((res) => res.json()),
    fetch("/data/post_author.json").then((res) => res.json()),
    fetch("/data/author.json").then((res) => res.json()),
  ]).then((values) => {
    const [postTable, postAuthorTable, authorTable] = values;
    const postAuthorRows = [];
    for (const [_, postAuthorRow] of Object.entries(postAuthorTable)) {
      if (postAuthorRow.postId === postId) {
        postAuthorRows.push(postAuthorRow);
      }
    }
    const authorNames = [];
    for (const postAuthorRow of postAuthorRows) {
      authorNames.push(authorTable[postAuthorRow.authorId].name);
    }
    const authorStr = authorNames.join(", ");
    const { title, excerpt, creationDate, updateDate } = postTable[postId];
    const items = [];
    document.title = title;
    document
      .querySelector("meta[name=description]")
      .setAttribute("content", excerpt);
    for (const item of [
      authorStr,
      `Created on ${getDateLocaleStr(creationDate)}`,
      updateDate ? `Updated on ${getDateLocaleStr(updateDate)}` : "",
    ]) {
      if (item) {
        items.push(item);
      }
    }
    for (let i = 0; i < items.length; i++) {
      const post__detailEl = document.createElement("p");
      post__detailsEl.appendChild(post__detailEl);
      post__detailEl.classList.add("post__detail");
      post__detailEl.classList.add("paragraph");
      post__detailEl.appendChild(document.createTextNode(items[i]));
      if (i < items.length - 1) {
        post__detailEl.classList.add("post__detail_has-right-border");
      }
    }
  });
}

export function initSinglePostPage({ postId, headings, references }) {
  updateDocumentTitle();
  addAppBar();
  updatePostDetails(postId);
  addSidebar(headings);
  addTagList(postId);
  addReferenceList(references);
  addFooter();
}
