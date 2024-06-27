function fillHeadingTree(array, newNode) {
    if (array.length === 0) {
        array.push(newNode)
        return
    }
    const currNode = array[array.length - 1]
    if (newNode.level <= currNode.level) {
        array.push(newNode)
        return
    }
    fillHeadingTree(
        currNode.children,
        newNode
    )
}

function createHeadingTree(headings) {
    const headingTree = []
    for (let i = 0; i < headings.length; i++) {
        const newNode = {
            ...headings[i],
            children: []
        }
        fillHeadingTree(headingTree, newNode)
    }
    return headingTree
}

function toggleSubtree(togglerClassName, subtreeClassName) {
    const headingTree__togglerEl = document.querySelector(`.${togglerClassName}`)
    let headingTree__togglerInnerHTML = "▸"
    const OPENED_ATTRIBUTE_NAME = "opened"
    if (headingTree__togglerEl.getAttribute(OPENED_ATTRIBUTE_NAME) === null) {
        headingTree__togglerEl.setAttribute(OPENED_ATTRIBUTE_NAME, "")
        headingTree__togglerInnerHTML = "▾"
    } else {
        headingTree__togglerEl.removeAttribute(OPENED_ATTRIBUTE_NAME)
    }
    headingTree__togglerEl.innerHTML = headingTree__togglerInnerHTML
    // TODO: refactor this. this is a quick fix because there is 1 link list each for mobile and desktop
    for (const headingTree__subtreeEl of document.querySelectorAll(`.${subtreeClassName}`)) {
        headingTree__subtreeEl.classList.toggle("display_block")
    }
}

function getSubtreeClassName(i) {
    return `subtree-${i}`
}

function fillHeadingTreeEl(array, depth, data) {
    const headingTreeEl = document.createElement("ol")
    if (depth > 0) {
        headingTreeEl.classList.add("heading-tree__subtree")
        headingTreeEl.classList.add(getSubtreeClassName(data.subtreeCount))
        data.subtreeCount += 1
    }
    else {
        headingTreeEl.classList.add("heading-tree")
    }
    for (let i = 0; i < array.length; i++) {
        const currNode = array[i]
        const headingTree__nodeEl = document.createElement("li")
        headingTree__nodeEl.classList.add("heading-tree__node")
        headingTreeEl.appendChild(headingTree__nodeEl)
        const headingTree__linkEl = document.createElement("a")
        headingTree__linkEl.classList.add("heading-tree__link")
        headingTree__linkEl.appendChild(document.createTextNode(currNode.name))
        headingTree__linkEl.onclick = function () {
            const headingEl = document.querySelector(`#${array[i].id}`)
            if (!headingEl) {
                return
            }
            const targetY = window.scrollY + headingEl.getBoundingClientRect().top
            window.scrollTo(0, targetY - 64)
        }
        if (currNode.children.length !== 0) {
            const subtreeCount = data.subtreeCount // TODO: why this fixes the problem?
            const togglerEl = document.createElement("a")
            togglerEl.classList.add("heading-tree__toggler")
            togglerEl.innerHTML = "▸"
            const togglerClassName = `heading-tree__${data.prefix}-toggler-${subtreeCount}`
            togglerEl.classList.add(togglerClassName)
            togglerEl.onclick = function () {
                toggleSubtree(
                    togglerClassName,
                    getSubtreeClassName(subtreeCount)
                )
            }
            headingTree__nodeEl.appendChild(togglerEl)
            headingTree__nodeEl.appendChild(headingTree__linkEl)
            headingTreeEl.appendChild(
                fillHeadingTreeEl(
                    currNode.children,
                    depth + 1,
                    data
                )
            )
        } else {
            headingTree__nodeEl.appendChild(headingTree__linkEl)
        }
    }
    return headingTreeEl
}

function addHeadingTreeEl(headings, sidebarLayoutEl, prefix) {
    const tree = createHeadingTree(headings)
    const data = {
        subtreeCount: 0,
        prefix: prefix
    }
    sidebarLayoutEl.appendChild(
        fillHeadingTreeEl(tree, 0, data)
    )
}

function addMobileSidebar(headings) {
    const mobileSidebarEl = document.querySelector(".mobile-sidebar")
    const mobileSidebar__togglerEl = document.createElement("a")
    mobileSidebarEl.appendChild(mobileSidebar__togglerEl)
    mobileSidebar__togglerEl.classList.add("mobile-sidebar__toggler")
    mobileSidebar__togglerEl.href = "javascript:void(0);"
    mobileSidebar__togglerEl.innerHTML = `
        <svg class="mobile-sidebar__toggler-icon display_flex" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512">
            <path
                d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
        </svg>
        <svg class="mobile-sidebar__toggler-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
        </svg>
    `
    mobileSidebar__togglerEl.onclick = function () {
        const mobileSidebar__layoutEl = document.querySelector(".mobile-sidebar__layout")
        mobileSidebar__layoutEl.classList.toggle("display_flex")
        mobileSidebar__togglerEl.classList.toggle("mobile-sidebar__toggler_opened")
        for (const mobileSidebar__togglerIconEl of document.querySelectorAll(".mobile-sidebar__toggler-icon")) {
            mobileSidebar__togglerIconEl.classList.toggle("display_flex")
        }
    }
    const mobileSidebar__layoutEl = document.createElement("nav")
    mobileSidebarEl.appendChild(mobileSidebar__layoutEl)
    mobileSidebar__layoutEl.classList.add("sidebar__layout", "mobile-sidebar__layout")
    addHeadingTreeEl(headings, mobileSidebar__layoutEl, "mobile")
}

function addDesktopSidebar(headings) {
    const desktopSidebarEl = document.querySelector(".desktop-sidebar")
    const desktopSidebar__layoutEl = document.createElement("nav")
    desktopSidebarEl.appendChild(desktopSidebar__layoutEl)
    desktopSidebar__layoutEl.classList.add("sidebar__layout", "desktop-sidebar__layout")
    addHeadingTreeEl(headings, desktopSidebar__layoutEl, "desktop")
}

function addSidebar(headings) {
    addMobileSidebar(headings)
    addDesktopSidebar(headings)
}