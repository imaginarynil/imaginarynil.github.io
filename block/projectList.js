function createProjectList__itemEl(
  url,
  imgUrl,
  title,
  updateDate,
  description
) {
  const projectList__itemEl = document.createElement("a");
  projectList__itemEl.classList.add("project-list__item");
  projectList__itemEl.href = url;
  const projectList__image = document.createElement("img");
  projectList__itemEl.appendChild(projectList__image);
  projectList__image.classList.add("project-list__image");
  projectList__image.src = imgUrl;
  const projectList__textLayout = document.createElement("div");
  projectList__itemEl.appendChild(projectList__textLayout);
  projectList__textLayout.classList.add("project-list__text-layout");
  const projectList__title = document.createElement("h2");
  projectList__textLayout.appendChild(projectList__title);
  projectList__title.classList.add("heading-2", "project-list__title");
  projectList__title.appendChild(document.createTextNode(title));
  const projectList__updateDate = document.createElement("p");
  projectList__textLayout.appendChild(projectList__updateDate);
  projectList__updateDate.classList.add("paragraph");
  projectList__updateDate.classList.add("project-list__update-date");
  projectList__updateDate.appendChild(document.createTextNode(updateDate));
  const projectList__description = document.createElement("p");
  projectList__textLayout.appendChild(projectList__description);
  projectList__description.classList.add("paragraph");
  projectList__description.classList.add("project-list__description");
  projectList__description.appendChild(document.createTextNode(description));
  return projectList__itemEl;
}

function isProject(postTagTable, postId, tagTable) {
  for (const [_, postTagRow] of Object.entries(postTagTable)) {
    if (
      postId === postTagRow.postId &&
      tagTable[postTagRow.tagId].name === "project"
    ) {
      return true;
    }
  }
  return false;
}

export function addProjectList() {
  const projectListEl = document.querySelector(".project-list");
  Promise.all([
    fetch("/data/post.json").then((res) => res.json()),
    fetch("/data/post_tag.json").then((res) => res.json()),
    fetch("/data/tag.json").then((res) => res.json()),
  ]).then((values) => {
    const postTable = values[0];
    const postTagTable = values[1];
    const tagTable = values[2];
    for (const [postId, postRow] of Object.entries(postTable)) {
      const updateDate = new Date(postRow.updateDate);
      const updateDateStr = `${updateDate.toLocaleString("default", {
        month: "long",
      })} ${updateDate.getDate()}, ${updateDate.getFullYear()}`;
      if (isProject(postTagTable, postId, tagTable)) {
        projectListEl.appendChild(
          createProjectList__itemEl(
            postRow.url,
            postRow.imgUrl,
            postRow.title,
            updateDateStr,
            postRow.excerpt
          )
        );
      }
    }
  });
}
