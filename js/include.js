(async function include() {
  const objs = document.getElementsByTagName("include");
  const tags = Array.from(objs);
  for (let tag of tags) {
    const src = tag.getAttribute("src");
    const data = await fetch(src);
    const html = await data.text();
    tag.outerHTML = html;
  }
})();
