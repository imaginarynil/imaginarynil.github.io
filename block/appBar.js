function createNavigationEl(links, listClassName, itemClassName) {
    const navigationEl = document.createElement("nav")
    navigationEl.classList.add(listClassName)
    for (let i = 0; i < links.length; i++) {
        const navigation__linkEl = document.createElement("a")
        navigationEl.appendChild(navigation__linkEl)
        navigation__linkEl.classList.add(itemClassName)
        navigation__linkEl.appendChild(document.createTextNode(links[i].name))
        navigation__linkEl.href = links[i].url
    }
    return navigationEl
}

function addAppBar() {
    const navLinks = [
        { name: "Home", url: "/index.html" },
        { name: "Posts", url: "/post/index.html" },
        { name: "Projects", url: "/project/index.html" },
        { name: "About", url: "/about/index.html" }
    ]
    const websiteVersion = "1.0.0"
    const appBarEl = document.querySelector(".app-bar")
    const appBar__layoutEl = document.createElement("div")
    appBarEl.appendChild(appBar__layoutEl)
    appBar__layoutEl.classList.add("app-bar__layout")
    const logoEl = document.createElement("a")
    appBar__layoutEl.appendChild(logoEl)
    logoEl.classList.add("logo", "app-bar__logo")
    logoEl.href = "/index.html"
    logoEl.appendChild(document.createTextNode("imaginarynil"))
    const logo__versionEl = document.createElement("span")
    logoEl.appendChild(logo__versionEl)
    logo__versionEl.classList.add("logo__version")
    logo__versionEl.appendChild(document.createTextNode(`v${websiteVersion}`))
    appBar__layoutEl.appendChild(createNavigationEl(
        navLinks,
        "navigation",
        "navigation__link"
    ))
    const appBar__togglerEl = document.createElement("a")
    appBar__layoutEl.appendChild(appBar__togglerEl)
    appBar__togglerEl.classList.add("app-bar__toggler")
    appBar__togglerEl.href = "javascript:void(0);"
    appBar__togglerEl.innerHTML = `
            <svg class="app-bar__toggler-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                    d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
            `
    appBar__togglerEl.onclick = function () {
        let mobileNavigationEl = document.querySelector(".mobile-navigation");
        mobileNavigationEl.classList.toggle("display_flex")
    }
    appBarEl.appendChild(createNavigationEl(
        navLinks,
        "mobile-navigation",
        "mobile-navigation__link"
    ))
}