import { addAppBar } from "/block/appBar.js";
import { addFooter } from "/block/footer.js";
import { addProjectList } from "/block/projectList.js";
import { updateDocumentTitle } from "/module/updateDocumentTitle.js";

export function initProjectPage() {
  updateDocumentTitle();
  addAppBar();
  addProjectList();
  addFooter();
}
