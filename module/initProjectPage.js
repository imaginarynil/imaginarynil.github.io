import { addAppBar } from "/block/appBar.js";
import { addFooter } from "/block/footer.js";
import { addProjectList } from "/block/projectList.js";

export function initProjectPage() {
  addAppBar();
  addProjectList();
  addFooter();
}
