function createAccountListEl() {
  const footer__accountListEl = document.createElement("ul");
  footer__accountListEl.classList.add("footer__account-list");
  const accounts = [
    {
      name: "Github",
      url: "https://github.com/imaginarynil",
    },
  ];
  for (let i = 0; i < accounts.length; i++) {
    const footer__accountItemEl = document.createElement("li");
    footer__accountListEl.appendChild(footer__accountItemEl);
    footer__accountItemEl.classList.add("footer__account-item");
    const footer__accountLinkEl = document.createElement("a");
    footer__accountItemEl.appendChild(footer__accountLinkEl);
    footer__accountLinkEl.classList.add("link", "footer__account-link");
    footer__accountLinkEl.href = accounts[i].url;
    footer__accountLinkEl.appendChild(
      document.createTextNode(accounts[i].name)
    );
  }
  return footer__accountListEl;
}

function addFooter() {
  const footerEl = document.querySelector(".footer");
  const footer__layoutEl = document.createElement("div");
  footerEl.appendChild(footer__layoutEl);
  footer__layoutEl.classList.add("footer__layout");
  const footer__accountListEl = createAccountListEl();
  footer__layoutEl.appendChild(footer__accountListEl);
  const footer__messageEl = document.createElement("div");
  footer__layoutEl.appendChild(footer__messageEl);
  footer__messageEl.classList.add("footer__message");
  footer__messageEl.innerHTML = `"For a genius, nothing is more precious than failure." -The Herta, Honkai: Star Rail`;
  const footer__copyrightEl = document.createElement("div");
  footer__layoutEl.appendChild(footer__copyrightEl);
  footer__copyrightEl.classList.add("footer__copyright");
  footer__copyrightEl.appendChild(
    document.createTextNode("© Daniel Sugianto ")
  );
  const footer__yearEl = document.createElement("span");
  footer__copyrightEl.appendChild(footer__yearEl);
  footer__yearEl.classList.add("footer__year");
  footer__yearEl.innerHTML = new Date().getFullYear();
}
