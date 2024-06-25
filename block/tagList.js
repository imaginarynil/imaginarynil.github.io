function addTagList(postId) {
    const tagListEl = document.querySelector(".tag-list")
    fetch("/data/post.json")
        .then(res => res.json())
        .then(postTable => {
            fetch("/data/post_tag.json")
                .then(res => res.json())
                .then(postTagTable => {
                    fetch("/data/tag.json")
                        .then(res => res.json())
                        .then(tagTable => {
                            for (const [_, val] of Object.entries(postTagTable)) {
                                if (val.postId === postId) {
                                    const tagListItemEl = document.createElement("li")
                                    tagListEl.appendChild(tagListItemEl)
                                    tagListItemEl.classList.add("tag-list__item")
                                    tagListItemEl.appendChild(document.createTextNode(tagTable[val.tagId].name))
                                }
                            }
                        })
                })
        })
}