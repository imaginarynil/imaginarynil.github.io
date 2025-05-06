import { addAppBar } from "/block/appBar.js";
import { addPostList } from "/block/postList.js";
import { addFooter } from "/block/footer.js";

export function initHomePage({ postLimit = -1 }) {
  addAppBar();
  addPostList(postLimit);
  addFooter();
}
