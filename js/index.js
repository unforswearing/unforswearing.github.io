// use alpine for header / footer templating so I can stop
// copying this code around the site (maybe use handlebars?)
const template = {
  header: `<a href="https://unforswearing.com"><img src="./img/me.png" /></a>
    <h1 style="padding-top: 0px">
      <span x-show="page !== ''"
        ><a href="https://unforswearing.com">Alvin Charity</a></span
      >
      <span x-show="page === ''">Alvin Charity</span>
    </h1>
    <hr />
    <br />
    <!-- main block starts on the next line -->`,
  footer: `<div style="padding-top: 70px">
        <hr />
        <span style="font-size: 80%; padding-top: 0px">
          <a href="/index.html">HOME</a>
          &nbsp;&nbsp;&nbsp;<span class="divider">|</span>&nbsp;&nbsp;&nbsp;
          <a href="https://linkedin.com/in/alvin-charity" target="_blank"
            >LINKEDIN</a
          >
          &nbsp;&nbsp;&nbsp;<span class="divider">|</span>&nbsp;&nbsp;&nbsp;
          <a href="https://github.com/unforswearing" target="_blank">GITHUB</a>
        </span>
      </div>
      <!-- main block ends on the next line -->`,
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
