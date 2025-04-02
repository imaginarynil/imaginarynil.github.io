class ReferenceItem {
  constructor(identifier, authors, title, year, linkText, linkAddress) {
    this.identifier = identifier;
    this.authors = [...authors]; // copy object
    this.authorStr = this.getAuthorStr(authors);
    this.title = title;
    this.year = year;
    this.linkText = linkText;
    this.linkAddress = linkAddress;
    this.index = 0;
    this.TEXT_STYLE_NORMAL = "normal";
    this.TEXT_STYLE_ITALIC = "italic";
  }
  getAuthorStr(authors) {
    if (authors.length === 0) {
      return "Anonymous";
    }
    if (authors.length === 1) {
      return authors[0];
    } else if (authors.length === 2) {
      return `${authors[0]} and ${authors[1]}`;
    } else {
      return `${authors.slice(0, authors.length - 1).join(", ")}, and ${
        authors[authors.length - 1]
      }`;
    }
  }
  setIndex(index) {
    this.index = index;
  }
  getHtmlElements() {
    const items = {
      authorStr: {
        val: this.authorStr,
        style: this.TEXT_STYLE_NORMAL,
      },
      title: {
        val: this.title,
        style: this.TEXT_STYLE_ITALIC,
      },
      year: {
        val: this.year,
        style: this.TEXT_STYLE_NORMAL,
      },
    };
    const cleanedItems = {};
    for (const [key, val] of Object.entries(items)) {
      const text = val.val;
      if (!text) {
        continue;
      }
      cleanedItems[key] = val;
    }
    const htmlElements = [];
    const cleanedItemEntries = Object.entries(cleanedItems);
    for (let i = 0; i < cleanedItemEntries.length; i++) {
      const [_, value] = cleanedItemEntries[i];
      const rawText = value.val;
      let text = `${rawText}. `;
      switch (value.style) {
        case this.TEXT_STYLE_ITALIC:
          const italicEl = document.createElement("em");
          italicEl.innerText = text;
          htmlElements.push(italicEl);
          break;
        default:
          htmlElements.push(document.createTextNode(text));
      }
    }
    return htmlElements;
  }
}

/*
References:
  - https://en.m.wikipedia.org/wiki/Wiki_software
*/

class ReferenceRepository {
  constructor(referenceItems) {
    this.orderedIdentifiers = this.createIdentifierArray(referenceItems);
    this.map = this.createMap(referenceItems);
  }
  createIdentifierArray(referenceItems) {
    const identifiers = [];
    for (let i = 0; i < referenceItems.length; i++) {
      identifiers.push(referenceItems[i].identifier);
    }
    return identifiers;
  }
  createMap(referenceItems) {
    const map = {};
    for (let i = 0; i < referenceItems.length; i++) {
      map[referenceItems[i].identifier] = referenceItems[i];
      referenceItems[i].setIndex(i + 1);
    }
    return map;
  }
  getByIdentifier(identifier) {
    return this.map[identifier];
  }
  getAll() {
    const rows = [];
    for (let i = 0; i < this.orderedIdentifiers.length; i++) {
      rows.push(this.map[this.orderedIdentifiers[i]]);
    }
    return rows;
  }
}

// TODO: add backlinks like wikipedia
class ReferencePresenter {
  constructor(referenceRepository) {
    this.referenceRepository = referenceRepository;
    this.UNKNOWN_INDEX = "?";
  }
  getIndexByIdentifier(identifier) {
    const row = this.referenceRepository.getByIdentifier(identifier);
    if (!row) {
      return this.UNKNOWN_INDEX;
    }
    return row.index;
  }
  updateCitations() {
    for (const citationEl of document.querySelectorAll(".citation")) {
      const citation__linkEl = document.createElement("a");
      citationEl.appendChild(citation__linkEl);
      citation__linkEl.classList.add("link", "citation__link");
      const identifier = citationEl.dataset.id;
      citation__linkEl.href = "javascript: void(0)";
      const index = this.getIndexByIdentifier(identifier);
      const citationText = `[${index}]`;
      if (index !== this.UNKNOWN_INDEX) {
        citation__linkEl.href = `#${identifier}`;
      }
      citation__linkEl.appendChild(document.createTextNode(citationText));
      const REFERENCE_ITEM_SELECTED_CLASS_NAME =
        "reference-list__item_selected";
      const clearReferenceItemHighlight = function () {
        for (const el of document.querySelectorAll(".reference-list__item")) {
          el.classList.remove(REFERENCE_ITEM_SELECTED_CLASS_NAME);
        }
      };
      citation__linkEl.onclick = function () {
        clearReferenceItemHighlight();
        const selectedItemEl = document.querySelector(`#${identifier}`);
        selectedItemEl.classList.add(REFERENCE_ITEM_SELECTED_CLASS_NAME);
      };
    }
  }
  createReferenceList__itemEl(htmlId, htmlElements, linkText, linkAddress) {
    const referenceList__itemEl = document.createElement("li");
    referenceList__itemEl.id = htmlId;
    referenceList__itemEl.classList.add("reference-list__item");
    for (const htmlElement of htmlElements) {
      referenceList__itemEl.appendChild(htmlElement);
    }
    const referenceList__linkEl = document.createElement("a");
    referenceList__itemEl.appendChild(referenceList__linkEl);
    referenceList__linkEl.classList.add("link", "reference-list__link");
    referenceList__linkEl.appendChild(document.createTextNode(linkText));
    referenceList__linkEl.href = linkAddress;
    referenceList__itemEl.appendChild(document.createTextNode("."));
    return referenceList__itemEl;
  }
  addReferenceList() {
    const referenceListEl = document.querySelector(".reference-list");
    const referenceList__titleEl = document.createElement("h2");
    referenceListEl.appendChild(referenceList__titleEl);
    referenceList__titleEl.classList.add(
      "reference-list__title",
      "heading-2",
      "post__heading-2"
    );
    referenceList__titleEl.appendChild(document.createTextNode("References"));
    const referenceList__orderedListEl = document.createElement("ol");
    referenceListEl.appendChild(referenceList__orderedListEl);
    referenceList__orderedListEl.classList.add("reference-list__ordered-list");
    const referenceRows = this.referenceRepository.getAll();
    for (let i = 0; i < referenceRows.length; i++) {
      referenceList__orderedListEl.appendChild(
        this.createReferenceList__itemEl(
          referenceRows[i].identifier,
          referenceRows[i].getHtmlElements(),
          referenceRows[i].linkText,
          referenceRows[i].linkAddress
        )
      );
    }
  }
}
