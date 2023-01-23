const action = {
  get() {
    return localStorage["action"];
  },
  load() {
    localStorage.setItem("action", "load");
  },
  new() {
    localStorage.setItem("action", "new");
  },
  save() {
    localStorage.setItem("action", "save");
  },
  delete() {
    localStorage.setItem("action", "delete");
  },
  removeAll() {
    localStorage.setItem("action", "removeAll");
  },
  loadFile() {
    localStorage.setItem("action", "loadFile");
  },
  loadNewFile() {
    localStorage.setItem("action", "loadNewFile");
  },
  loadFileByUrl() {
    localStorage.setItem("action", "loadFileByUrl");
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
  if (localStorage.length > 3) {
    document.getElementById("showmult").style.display = "block";
  }
}
function setHelpMessage(message) {
  localStorage.setItem("msg", message);
}
function getHelpMessage() {
  return localStorage["msg"];
}
function getLocation() {
  return window.location.href.toString().split("?");
}
function getContent() {
  return document.getElementById("content").innerHTML;
}
function setContent(text) {
  document.getElementById("content").innerHTML = text;
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
  } else if (localStorage[title]) {
    setContent(localStorage[title]);
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
  } else if (localStorage[title]) {
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
  let message;
  let url;
  if (!content) {
    url = "";
    message = messageData().error_enter_text();
  } else if (content) {
    localStorage.setItem(title, content);
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
  if (!title || !localStorage[title]) {
    message = messageData().error_no_file_delete();
  } else {
    localStorage.removeItem(title);
    message = messageData().delete_success(title);
  }
  setHelpMessage(message);
  updateHelp(getHelpMessage());
  const execLoadFile = () => updateUrl("");
  setTimeout(execLoadFile, 1500);
}
function clearLocalStorage() {
  action.removeAll();
  Object.keys(localStorage).forEach((item) => localStorage.removeItem(item));
  setContent("");
  let message = messageData().clear_local_storage_success();
  setHelpMessage(message);
  updateHelp(getHelpMessage());
  setTimeout(() => updateUrl(""), 2500);
}
