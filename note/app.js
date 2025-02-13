// -------------------------------------------------------------------
// begin app.js
// see app.new.js for revision using CouchDB
const storage = localStorage;
const action = {
  get() { return storage["action"]; },
  load() { storage.setItem("action", "load"); },
  new() { storage.setItem("action", "new"); },
  save() { storage.setItem("action", "save"); },
  delete() { storage.setItem("action", "delete"); },
  removeAll() { storage.setItem("action", "removeAll"); },
  loadFile() { storage.setItem("action", "loadFile"); },
  loadNewFile() { storage.setItem("action", "loadNewFile"); },
  loadFileByUrl() { storage.setItem("action", "loadFileByUrl"); },
};
function messageData(title) {
  function errorMessage(message) {
    return `<span style="color: rgb(144, 42, 42);">
              ${message}
            </span>`;
  }
  const options = {
    newMessage(errorMessageText) {
      return errorMessage(errorMessageText);
    },
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
function getLocation() {
  return window.location.href.toString().split("?");
}
function getContent() {
  return document.getElementById("content").innerText;
}
function setContent(text) {
  return document.getElementById("content").innerText = text
}
function updateHelp(text) {
  let help = document.getElementById("help");
  help.innerHTML = text;
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
    message = messageData().newMessage("there are no files to delete.");
  } else if (!title || title === undefined) {
    message = messageData().startup();
  } else if (storage[title]) {
    setContent(storage[title]);
    message = messageData().load_success(title);
  } else {
    message = messageData().error_file_not_found(title);
    setTimeout(() => updateUrl(""), 1500);
  }

  updateHelp(message);
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

  updateHelp(message);
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

  if (!content) {
    let noContentMsg = messageData().newMessage(
      "no content to save, add some text and try again."
    )
    return updateHelp(noContentMsg)
  }

  storage.setItem(title, content);
  let url = title;
  const execLoadFile = () => updateUrl(url);
  setTimeout(execLoadFile, 1500);

  updateHelp(messageData().save_success(title));
}
function displaySavedFiles() {
  Object.keys(localStorage).forEach((item, i) => {
    let title = item;
    let content = localStorage[item];
  })
}
function deleteCurrentFile() {
  action.delete();
  let title = getLocation()[1];
  let content = getContent();

  if (content) {
    return updateHelp(
      messageData().newMessage("clearing unsaved content.")
    );
  } else if (!title || !storage[title]) {
    return updateHelp(messageData().error_no_file_delete());
  }

  storage.removeItem(title);

  const execLoadFile = () => updateUrl("");
  setTimeout(execLoadFile, 1500);

  updateHelp(messageData().delete_success(title));
}
function clearLocalStorage() {
  action.removeAll();
  Object.keys(storage).forEach((item) => {
    if (item) storage.removeItem(item)
  });

  setContent("");

  let message = messageData().clear_local_storage_success();
  updateHelp(message);
  setTimeout(() => updateUrl(""), 2500);
}
