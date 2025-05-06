function createPostList__itemEl(
  creationDate,
  authorName,
  title,
  excerpt,
  url,
  tagListEl
) {
  const postList__itemEl = document.createElement("a");
  postList__itemEl.href = url;
  postList__itemEl.classList.add("post-list__item");
  const postList__titleEl = document.createElement("h2");
  postList__itemEl.appendChild(postList__titleEl);
  postList__titleEl.classList.add("heading-2", "post-list__title");
  postList__titleEl.appendChild(document.createTextNode(title));
  const postList__authorName = document.createElement("p");
  postList__itemEl.appendChild(postList__authorName);
  postList__authorName.classList.add("paragraph");
  postList__authorName.classList.add("post-list__author-name");
  postList__authorName.appendChild(document.createTextNode(authorName));
  const postList__creationDateEl = document.createElement("p");
  postList__itemEl.appendChild(postList__creationDateEl);
  postList__creationDateEl.classList.add("paragraph");
  postList__creationDateEl.classList.add("post-list__creation-date");
  postList__creationDateEl.appendChild(document.createTextNode(creationDate));
  const postList__excerptEl = document.createElement("p");
  postList__itemEl.appendChild(postList__excerptEl);
  postList__excerptEl.classList.add("paragraph");
  postList__excerptEl.classList.add("post-list__excerpt");
  postList__excerptEl.appendChild(document.createTextNode(excerpt));
  postList__itemEl.appendChild(tagListEl);
  return postList__itemEl;
}

function addPostList(limit) {
  Promise.all([
    fetch("/data/post.json").then((res) => res.json()),
    fetch("/data/post_author.json").then((res) => res.json()),
    fetch("/data/author.json").then((res) => res.json()),
    fetch("/data/post_tag.json").then((res) => res.json()),
    fetch("/data/tag.json").then((res) => res.json()),
  ]).then((values) => {
    const postTable = values[0];
    const postAuthorTable = values[1];
    const authorTable = values[2];
    const postTagTable = values[3];
    const tagTable = values[4];
    const postListEl = document.querySelector(".post-list");
    let postTableArray = Object.entries(postTable);
    if (postTableArray.length === 0) {
      postListEl.appendChild(document.createTextNode("No posts were found"));
      return;
    }
    postTableArray.sort(function (item1, item2) {
      const date1 = new Date(item1[1].creationDate);
      const date2 = new Date(item2[1].creationDate);
      if (date1.getTime() < date2.getTime()) {
        return 1;
      } else if (date1.getTime() > date2.getTime()) {
        return -1;
      }
      return 0;
    });
    if (limit > 0) {
      postTableArray = postTableArray.slice(0, limit);
    }
    for (const [postId, postRow] of postTableArray) {
      const creationDate = new Date(postRow.creationDate);
      const creationDateStr = `${creationDate.toLocaleString("default", {
        month: "long",
      })} ${creationDate.getDate()}, ${creationDate.getFullYear()}`;
      const authorNames = [];
      const postAuthorTableArray = Object.entries(postAuthorTable);
      for (const [_, postAuthorRow] of postAuthorTableArray) {
        if (postAuthorRow.postId === postId) {
          authorNames.push(authorTable[postAuthorRow.authorId].name);
        }
      }
      let authorNameStr = authorNames[0];
      if (authorNames.length === 2) {
        authorNameStr = authorNames.join(", ");
      } else if (authorNames.length > 2) {
        authorNameStr = `${authorNames[0]}, ${authorNames[1]}, et al.`;
      }
      postListEl.appendChild(
        createPostList__itemEl(
          creationDateStr,
          authorNameStr,
          postRow.title,
          postRow.excerpt,
          postRow.url,
          createTagListEl(postId, postTagTable, tagTable)
        )
      );
    }
  });
}
