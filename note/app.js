/***   Regex Markdown Parser by chalarangelo   ***/
// Replaces 'regex' with 'replacement' in 'str'
// Curry function, usage: replaceRegex(regexVar, replacementVar) (strVar)
const replaceRegex = function (regex, replacement) {
  return function (str) {
    return str.replace(regex, replacement);
  }
}
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
const paragraphRegex = /\n+(?!<pre>)(?!<h)(?!<ul>)(?!<blockquote)(?!<hr)(?!\t)([^\n]+)\n/g;
// Replacer functions for Markdown
const codeBlockReplacer = function (fullMatch) {
  return '\n<pre>' + fullMatch + '</pre>';
}
const inlineCodeReplacer = function (fullMatch, tagStart, tagContents) {
  return '<code>' + tagContents + '</code>';
}
const imageReplacer = function (fullMatch, tagTitle, tagURL) {
  return '<img src="' + tagURL + '" alt="' + tagTitle + '" />';
}
const linkReplacer = function (fullMatch, tagTitle, tagURL) {
  return '<a href="' + tagURL + '">' + tagTitle + '</a>';
}
const headingReplacer = function (fullMatch, tagStart, tagContents) {
  return '\n<h' + tagStart.trim().length + '>' + tagContents + '</h' + tagStart.trim().length + '>';
}
const boldItalicsReplacer = function (fullMatch, tagStart, tagContents) {
  return '<' + ((tagStart.trim().length == 1) ? ('em') : ('strong')) + '>' + tagContents + '</' + ((tagStart.trim().length == 1) ? ('em') : ('strong')) + '>';
}
const strikethroughReplacer = function (fullMatch, tagStart, tagContents) {
  return '<del>' + tagContents + '</del>';
}
const blockquoteReplacer = function (fullMatch, tagStart, tagContents) {
  return '\n<blockquote>' + tagContents + '</blockquote>';
}
const horizontalRuleReplacer = function (fullMatch) {
  return '\n<hr />';
}
const unorderedListReplacer = function (fullMatch) {
  let items = '';
  fullMatch.trim().split('\n').forEach(item => { items += '<li>' + item.substring(2) + '</li>'; });
  return '\n<ul>' + items + '</ul>';
}
const orderedListReplacer = function (fullMatch) {
  let items = '';
  fullMatch.trim().split('\n').forEach(item => { items += '<li>' + item.substring(item.indexOf('.') + 2) + '</li>'; });
  return '\n<ol>' + items + '</ol>';
}
const paragraphReplacer = function (fullMatch, tagContents) {
  return '<p>' + tagContents + '</p>';
}
// Rules for Markdown parsing (use in order of appearance for best results)
const replaceCodeBlocks = replaceRegex(codeBlockRegex, codeBlockReplacer);
const replaceInlineCodes = replaceRegex(inlineCodeRegex, inlineCodeReplacer);
const replaceImages = replaceRegex(imageRegex, imageReplacer);
const replaceLinks = replaceRegex(linkRegex, linkReplacer);
const replaceHeadings = replaceRegex(headingRegex, headingReplacer);
const replaceBoldItalics = replaceRegex(boldItalicsRegex, boldItalicsReplacer);
const replaceceStrikethrough = replaceRegex(strikethroughRegex, strikethroughReplacer);
const replaceBlockquotes = replaceRegex(blockquoteRegex, blockquoteReplacer);
const replaceHorizontalRules = replaceRegex(horizontalRuleRegex, horizontalRuleReplacer);
const replaceUnorderedLists = replaceRegex(unorderedListRegex, unorderedListReplacer);
const replaceOrderedLists = replaceRegex(orderedListRegex, orderedListReplacer);
const replaceParagraphs = replaceRegex(paragraphRegex, paragraphReplacer);
// Fix for tab-indexed code blocks
const codeBlockFixRegex = /\n(<pre>)((\n|.)*)(<\/pre>)/g;
const codeBlockFixer = function (fullMatch, tagStart, tagContents, lastMatch, tagEnd) {
  let lines = '';
  tagContents.split('\n').forEach(line => { lines += line.substring(1) + '\n'; });
  return tagStart + lines + tagEnd;
}
const fixCodeBlocks = replaceRegex(codeBlockFixRegex, codeBlockFixer);
// Replacement rule order function for Markdown
// Do not use as-is, prefer parseMarkdown as seen below
const replaceMarkdown = function (str) {
  return replaceParagraphs(replaceOrderedLists(replaceUnorderedLists(
    replaceHorizontalRules(replaceBlockquotes(replaceceStrikethrough(
      replaceBoldItalics(replaceHeadings(replaceLinks(replaceImages(
        replaceInlineCodes(replaceCodeBlocks(str))
      ))))
    )))
  )));
}
// Parser for Markdown (fixes code, adds empty lines around for parsing)
// Usage: parseMarkdown(strVar)
const parseMarkdown = function (str) {
  return fixCodeBlocks(replaceMarkdown('\n' + str + '\n')).trim();
}

const storage = localStorage;
const action = {
  get() {
    return storage["action"];
  },
  load() {
    storage.setItem("action", "load");
  },
  new() {
    storage.setItem("action", "new");
  },
  save() {
    storage.setItem("action", "save");
  },
  delete() {
    storage.setItem("action", "delete");
  },
  removeAll() {
    storage.setItem("action", "removeAll");
  },
  loadFile() {
    storage.setItem("action", "loadFile");
  },
  loadNewFile() {
    storage.setItem("action", "loadNewFile");
  },
  loadFileByUrl() {
    storage.setItem("action", "loadFileByUrl");
  },
};
function messageData(title) {
  function errorMessage(message) {
    return `<span style="color: rgb(144, 42, 42);">
              ${message}
            </span>`;
  }
  const options = {
    error_enter_text() {
      return errorMessage("enter text below before saving.");
    },
    error_no_file_delete() {
      return errorMessage("no file to delete.");
    },
    error_file_not_found(title) {
      return errorMessage(`'${title}' not found in local storage.`);
    },
    startup() {
      return "new file loaded. enter text below.";
    },
    load_success(title) {
      return `'${title}' loaded successfully.`;
    },
    save_success(title) {
      return ` saved '${title}'. reloading file.`;
    },
    delete_success(title) {
      return `removed ${title}.`;
    },
    clear_local_storage_success(title) {
      return `'${title}' not found in local storage.`;
    },
  };
  return options;
}
function execOnLoad() {
  loadFileByUrl();
  // storage[1:2] = msg, action;
  if (storage.length > 3) {
    document.getElementById("showmult").style.display = "block";
  }
}
function setHelpMessage(message) {
  storage.setItem("msg", message);
}
function getHelpMessage() {
  return storage["msg"];
}
function getLocation() {
  return window.location.href.toString().split("?");
}
function getContent() {
  return document.getElementById("content").innerText;
}
function setContent(text) {
  return document.getElementById("content").innerText = text
}
function markdownContent() {
  let content = getContent();
  let parsed = `<html><body>${parseMarkdown(content)}</body></html>`;

  let contentDiv = document.querySelectorAll("[contenteditable=true]")[0];

  document.getElementById("content").innerHTML = parsed
  storage.setItem("exception", "markdown");
  storage.setItem("mdcontent", `${content}`)

  let mdButton = document.getElementById("markdownbutton")
  mdButton.style.backgroundColor = "#f4f4f4"
  mdButton.style.color = "#4f4f4f"

  function sendParseMessage() {
    updateHelp(
      `file is already displayed as markdown.<br>
       click any other button to proceed.`
    )
  }

  mdButton.onclick = sendParseMessage

  // display message: "save disabled for markdown formatting"
  /* 
  window.saveToLocalStorage = () => {
    updateHelp(
      `save disabled for markdown parsing.<br>
       click 'new' to create a file.`
    )
  }
  */

  return contentDiv.setAttribute("contentEditable", false);
}
function updateHelp(text) {
  let help = document.getElementById("help");
  help.innerHTML = text;
  setHelpMessage(text);
}
function updateUrl(title) {
  let locArray = getLocation();
  let base = locArray[0];
  let newUrl;
  if (title) {
    newUrl = [base, title].join("?");
  } else {
    newUrl = base;
  }
  window.location.href = newUrl;
  loadFile(title);
}
function loadFile(title) {
  let previousAction = action.get();
  action.loadFile();
  let message;
  if (previousAction === "delete") {
    message = getHelpMessage();
  } else if (!title || title === undefined) {
    message = messageData().startup();
  } else if (storage[title]) {
    setContent(storage[title]);
    message = messageData().load_success(title);
  } else {
    message = messageData().error_file_not_found(title);
    setTimeout(() => updateUrl(""), 1500);
  }
  setHelpMessage(message);
  updateHelp(getHelpMessage());
}
function loadFileByUrl() {
  action.loadFileByUrl();
  let title = getLocation()[1];
  let message;
  if (!title || title === undefined) {
    message = messageData().startup();
  } else if (storage[title]) {
    message = messageData().load_success(title);
    loadFile(title);
  } else {
    message = messageData().error_file_not_found(title);
    setTimeout(() => updateUrl(""), 1500);
  }
  setHelpMessage(message);
  updateHelp(getHelpMessage());
}
function loadNewFile() {
  action.loadNewFile();
  setContent("");
  updateUrl("");
}
function saveToLocalStorage() {
  action.save();
  let title = new Date().getTime();
  let content = document.getElementById("content").innerText.toString();

  if (storage.getItem("exception") === "markdown") {
    content = storage.getItem("mdcontent").toString();
  }

  let message;
  let url;
  if (!content) {
    url = "";
    message = messageData().error_enter_text();
  } else if (content) {
    storage.setItem(title, content);
    message = messageData().save_success(title);
    url = title;
  }
  const execLoadFile = () => updateUrl(url);
  setTimeout(execLoadFile, 1500);
  setHelpMessage(message);
  updateHelp(getHelpMessage());
}
function deleteCurrentFile() {
  action.delete();
  let title = getLocation()[1];
  let message;
  if (!title || !storage[title]) {
    message = messageData().error_no_file_delete();
  } else {
    storage.removeItem(title);
    message = messageData().delete_success(title);
  }
  setHelpMessage(message);
  updateHelp(getHelpMessage());
  const execLoadFile = () => updateUrl("");
  setTimeout(execLoadFile, 1500);
}
function clearLocalStorage() {
  action.removeAll();
  Object.keys(storage).forEach((item) => storage.removeItem(item));
  setContent("");
  let message = messageData().clear_local_storage_success();
  setHelpMessage(message);
  updateHelp(getHelpMessage());
  setTimeout(() => updateUrl(""), 2500);
}
