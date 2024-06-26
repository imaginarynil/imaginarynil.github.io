function appendItemsToList(tagListEl, postId, postTagTable, tagTable) {
    for (const [_, postTagRow] of Object.entries(postTagTable)) {
        if (postTagRow.postId === postId) {
            const tagListItemEl = document.createElement("li")
            tagListEl.appendChild(tagListItemEl)
            tagListItemEl.classList.add("tag-list__item")
            tagListItemEl.appendChild(document.createTextNode(tagTable[postTagRow.tagId].name))
        }
    }
}

function createTagListEl(postId, postTagTable, tagTable) {
    const tagListEl = document.createElement("ul")
    tagListEl.classList.add("tag-list")
    appendItemsToList(tagListEl, postId, postTagTable, tagTable)
    return tagListEl
}

function addTagList(postId) {
    const tagListEl = document.querySelector(".tag-list")
    fetch("/data/post_tag.json")
        .then(res => res.json())
        .then(postTagTable => {
            fetch("/data/tag.json")
                .then(res => res.json())
                .then(tagTable => {
                    appendItemsToList(tagListEl, postId, postTagTable, tagTable)
                })
        })
}