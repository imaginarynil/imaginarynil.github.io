import { addAppBar } from "/block/appBar.js";
import { addFooter } from "/block/footer.js";
import { updateDocumentTitle } from "/module/updateDocumentTitle.js";

export function initAboutPage() {
  updateDocumentTitle();
  addAppBar();
  addFooter();
}
