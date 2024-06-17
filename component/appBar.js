function createNavLinkListEl(links, listClassName, itemClassName) {
    const navLinksEl = document.createElement("div")
    navLinksEl.classList.add(listClassName)
    for (let i = 0; i < links.length; i++) {
        const navLinkEl = document.createElement("a")
        navLinkEl.classList.add(itemClassName)
        navLinkEl.appendChild(document.createTextNode(links[i].name))
        navLinkEl.href = links[i].url
        navLinksEl.appendChild(navLinkEl)
    }
    return navLinksEl
}

function addAppBar() {
    const navLinks = [
        { name: "Home", url: "/index.html" },
        { name: "Post", url: "/post/index.html" },
        { name: "Project", url: "/project/index.html" },
        { name: "About", url: "/about/index.html" }
    ]
    const appBarEl = document.querySelector(".app-bar")
    const navContainerEl = document.createElement("div")
    appBarEl.appendChild(navContainerEl)
    navContainerEl.classList.add("nav-container")
    const navLogoEl = document.createElement("a")
    navContainerEl.appendChild(navLogoEl)
    navLogoEl.classList.add("nav-logo")
    navLogoEl.href = "/index.html"
    navLogoEl.appendChild(document.createTextNode("imaginarynil"))
    const navLinksContainerEl = document.createElement("div")
    navContainerEl.appendChild(navLinksContainerEl)
    navLinksContainerEl.classList.add("nav-links-container")
    navLinksContainerEl.appendChild(
        createNavLinkListEl(
            navLinks,
            "nav-links",
            "nav-link"
        )
    )
    const navToggleBtnEl = document.createElement("a")
    navContainerEl.appendChild(navToggleBtnEl)
    navToggleBtnEl.classList.add("nav-toggle-btn")
    navToggleBtnEl.href = "javascript:void(0);"
    // button icon
    navToggleBtnEl.innerHTML = `
            <svg class="nav-toggle-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                    d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
            `
    navToggleBtnEl.onclick = function () {
        let navDropdownEl = document.querySelector(".nav-dropdown");
        navDropdownEl.classList.toggle("nav-dropdown-opened")
    }
    const navDropdownEl = document.createElement("div")
    appBarEl.appendChild(navDropdownEl)
    navDropdownEl.classList.add("nav-dropdown")
    navDropdownEl.appendChild(createNavLinkListEl(
        navLinks,
        "nav-dropdown-links",
        "nav-dropdown-link"
    ))
}