export function getFormattedTitle(title) {
  return `${title} - imaginarynil`;
}

export function updateDocumentTitle() {
  document.title = getFormattedTitle(document.title);
}
