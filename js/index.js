// use alpine for header / footer templating so I can stop
// copying this code around the site (maybe use handlebars?)
const template = {
  header: `<!-- main block starts on the next line -->`,
  footer: `<!-- main block ends on the next line -->`,
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
const toggleDetails = (elementId) => {
  // longwinded to test, shorten when complete
  document.getElementById(elementId).open ?
    document.getElementById(elementId).open = false :
    document.getElementById(elementId).open = true;
}

