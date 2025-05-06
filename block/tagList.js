function appendTagItems(tagListEl, postId, postTagTable, tagTable) {
  for (const [_, postTagRow] of Object.entries(postTagTable)) {
    if (postTagRow.postId === postId) {
      const tagListItemEl = document.createElement("li");
      tagListEl.appendChild(tagListItemEl);
      tagListItemEl.classList.add("tag-list__item");
      tagListItemEl.appendChild(
        document.createTextNode(tagTable[postTagRow.tagId].name)
      );
    }
  }
}

export function createTagListEl(postId, postTagTable, tagTable) {
  const tagListEl = document.createElement("ul");
  tagListEl.classList.add("tag-list");
  appendTagItems(tagListEl, postId, postTagTable, tagTable);
  return tagListEl;
}

export function addTagList(postId) {
  const tagListEl = document.querySelector(".tag-list");
  Promise.all([
    fetch("/data/post_tag.json").then((res) => res.json()),
    fetch("/data/tag.json").then((res) => res.json()),
  ]).then((values) => {
    const postTagTable = values[0];
    const tagTable = values[1];
    appendTagItems(tagListEl, postId, postTagTable, tagTable);
  });
}
