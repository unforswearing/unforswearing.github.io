/***   Regex Markdown Parser by chalarangelo   ***/
// https://github.com/Chalarangelo/parse-md-js
// https://chalarangelo.github.io/parse-md-js/index.html
// Replaces 'regex' with 'replacement' in 'str'
// Curry function, usage: replaceRegex(regexVar, replacementVar) (strVar)
const replaceRegex = (regex, replacement) =>
  function (str) {
    return str.replace(regex, replacement);
  };
// Regular expressions for Markdown (a bit strict, but they work)
const codeBlockRegex = /((\n\t)(.*))+/g;
const inlineCodeRegex = /(`)(.*?)\1/g;
const imageRegex = /!\[([^\[]+)\]\(([^\)]+)\)/g;
const linkRegex = /\[([^\[]+)\]\(([^\)]+)\)/g;
const headingRegex = /\n(#+\s*)(.*)/g;
const boldItalicsRegex = /(\*{1,2})(.*?)\1/g;
const strikethroughRegex = /(\~\~)(.*?)\1/g;
const blockquoteRegex = /\n(&gt;|\>)(.*)/g;
const horizontalRuleRegex = /\n((\-{3,})|(={3,}))/g;
const unorderedListRegex = /(\n\s*(\-|\+)\s.*)+/g;
const orderedListRegex = /(\n\s*([0-9]+\.)\s.*)+/g;
const paragraphRegex =
  /\n+(?!<pre>)(?!<h)(?!<ul>)(?!<blockquote)(?!<hr)(?!\t)([^\n]+)\n/g;
// Replacer functions for Markdown
const codeBlockReplacer = (fullMatch) => `\n<pre>${fullMatch}</pre>`;
const inlineCodeReplacer = (tagContents) => `<code>${tagContents}</code>`;
const imageReplacer = (tagTitle, tagURL) =>
  `<img src="${tagURL}" alt="${tagTitle}" />`;
const linkReplacer = (tagTitle, tagURL) =>
  `<a href="${tagURL}">${tagTitle}</a>`;
const strikethroughReplacer = (tagContents) => `<del>${tagContents}</del>`;
const blockquoteReplacer = (tagContents) =>
  `\n<blockquote>${tagContents}</blockquote>`;
const paragraphReplacer = (tagContents) => `<p>${tagContents}</p>`;
const horizontalRuleReplacer = () => "\n<hr />";
const headingReplacer = (tagStart, tagContents) => {
  `\n<h${tagStart.trim().length}>${tagContents}</h${tagStart.trim().length}>`;
};
const boldItalicsReplacer = (tagStart, tagContents) => {
  `<${tagStart.trim().length == 1 ? "em" : "strong"}>
    ${tagContents}
   </${tagStart.trim().length == 1 ? "em" : "strong"}>`;
};
const unorderedListReplacer = (fullMatch) => {
  let items = "";
  fullMatch
    .trim()
    .split("\n")
    .forEach((item) => {
      items += `<li>${item.substring(2)}</li>`;
    });
  return `\n<ul>${items}</ul>`;
};
const orderedListReplacer = (fullMatch) => {
  let items = "";
  fullMatch
    .trim()
    .split("\n")
    .forEach((item) => {
      items += `<li>${item.substring(item.indexOf(".") + 2)}</li>`;
    });
  return `\n<ol>${items}</ol>`;
};
// Rules for Markdown parsing (use in order of appearance for best results)
const replaceCodeBlocks = replaceRegex(codeBlockRegex, codeBlockReplacer);
const replaceInlineCodes = replaceRegex(inlineCodeRegex, inlineCodeReplacer);
const replaceImages = replaceRegex(imageRegex, imageReplacer);
const replaceLinks = replaceRegex(linkRegex, linkReplacer);
const replaceHeadings = replaceRegex(headingRegex, headingReplacer);
const replaceBoldItalics = replaceRegex(boldItalicsRegex, boldItalicsReplacer);
const replaceceStrikethrough = replaceRegex(
  strikethroughRegex,
  strikethroughReplacer
);
const replaceBlockquotes = replaceRegex(blockquoteRegex, blockquoteReplacer);
const replaceHorizontalRules = replaceRegex(
  horizontalRuleRegex,
  horizontalRuleReplacer
);
const replaceUnorderedLists = replaceRegex(
  unorderedListRegex,
  unorderedListReplacer
);
const replaceOrderedLists = replaceRegex(orderedListRegex, orderedListReplacer);
const replaceParagraphs = replaceRegex(paragraphRegex, paragraphReplacer);
// Fix for tab-indexed code blocks
const codeBlockFixRegex = /\n(<pre>)((\n|.)*)(<\/pre>)/g;
const codeBlockFixer = function (tagStart, tagContents, tagEnd) {
  let lines = "";
  tagContents.split("\n").forEach((line) => {
    lines += `${line.substring(1)}\n`;
  });
  return tagStart + lines + tagEnd;
};
const fixCodeBlocks = replaceRegex(codeBlockFixRegex, codeBlockFixer);
// Replacement rule order function for Markdown
// Do not use as-is, prefer parseMarkdown as seen below
const replaceMarkdown = function (str) {
  return replaceParagraphs(
    replaceOrderedLists(
      replaceUnorderedLists(
        replaceHorizontalRules(
          replaceBlockquotes(
            replaceceStrikethrough(
              replaceBoldItalics(
                replaceHeadings(
                  replaceLinks(
                    replaceImages(replaceInlineCodes(replaceCodeBlocks(str)))
                  )
                )
              )
            )
          )
        )
      )
    )
  );
};
// Parser for Markdown (fixes code, adds empty lines around for parsing)
// Usage: parseMarkdown(strVar)
const parseMarkdown = function (str) {
  return fixCodeBlocks(replaceMarkdown(`\n${str}\n`)).trim();
};
