import { addAppBar } from "/block/appBar.js";
import { addPostList } from "/block/postList.js";
import { addFooter } from "/block/footer.js";
import { updateDocumentTitle } from "/module/updateDocumentTitle.js";

export function initPostPage({ postLimit = -1 }) {
  updateDocumentTitle();
  addAppBar();
  addPostList(postLimit);
  addFooter();
}
