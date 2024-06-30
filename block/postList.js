function createPostList__itemEl(createdDate, title, excerpt, url, tagListEl) {
    const postList__itemEl = document.createElement("a")
    postList__itemEl.href = url
    postList__itemEl.classList.add("post-list__item")
    const postList__createdDateEl = document.createElement("div")
    postList__itemEl.appendChild(postList__createdDateEl)
    postList__createdDateEl.classList.add("post-list__created-date")
    postList__createdDateEl.appendChild(
        document.createTextNode(createdDate)
    )
    const postList__layoutEl = document.createElement("div")
    postList__itemEl.appendChild(postList__layoutEl)
    postList__layoutEl.classList.add("post-list__layout")
    const postList__titleEl = document.createElement("h2")
    postList__layoutEl.appendChild(postList__titleEl)
    postList__titleEl.classList.add("heading-2", "post-list__title")
    postList__titleEl.appendChild(
        document.createTextNode(title)
    )
    const postList__mobileCreatedDateEl = document.createElement("p")
    postList__layoutEl.appendChild(postList__mobileCreatedDateEl)
    postList__mobileCreatedDateEl.classList.add("post-list__mobile-created-date")
    postList__mobileCreatedDateEl.appendChild(
        document.createTextNode(createdDate)
    )
    const postList__excerptEl = document.createElement("p")
    postList__layoutEl.appendChild(postList__excerptEl)
    postList__excerptEl.classList.add("post-list__excerpt")
    postList__excerptEl.appendChild(
        document.createTextNode(excerpt)
    )
    postList__layoutEl.appendChild(tagListEl)
    return postList__itemEl
}

function addPostList(limit) {
    fetch("/data/post.json")
        .then(res => res.json())
        .then(postTable => {
            const postListEl = document.querySelector(".post-list")
            let postTableArray = Object.entries(postTable)
            if (postTableArray.length === 0) {
                postListEl.appendChild(
                    document.createTextNode("No posts were found")
                )
                return
            }
            postTableArray.sort(function (a, b) {
                const date1 = new Date(a[1].createdDate)
                const date2 = new Date(b[1].createdDate)
                if (date1.getTime() < date2.getTime()) {
                    return 1
                } else if (date1.getTime() > date2.getTime()) {
                    return -1
                }
                return 0
            })
            if (limit > 0) {
                postTableArray = postTableArray.slice(0, limit)
            }
            fetch("/data/post_tag.json")
                .then(res => res.json())
                .then(postTagTable => {
                    fetch("/data/tag.json")
                        .then(res => res.json())
                        .then(tagTable => {
                            for (const [postId, postRow] of postTableArray) {
                                postListEl.appendChild(
                                    createPostList__itemEl(
                                        postRow.createdDate,
                                        postRow.title,
                                        postRow.excerpt,
                                        postRow.url,
                                        createTagListEl(postId, postTagTable, tagTable)
                                    )
                                )
                            }

                        })
                })


        })
}