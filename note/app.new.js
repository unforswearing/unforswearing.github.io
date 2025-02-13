/* Rewrite of app.js using PouchDB instead of localStorage

Required actions:
- On first load, create empty file named `date.today().toISOString()`
  - Error if file cannot be created
- On load `filename`, find `filename` in db and load contents
  - eg. visit `unforswearing.com/note/2025-02-12T21:14:40.436Z` to load
    a file with the id `2025-02-12T21:14:40.436Z` from PouchDB.
  - Error if file not found in PouchDB
- On "save", add current file to DB
  - if file was loaded via url, save the changes back to the same file in PouchDB
    - add `_rev` field to `noteData` object with value `date.today().toISOString()`
  - if a new file is saved, add file named `date.today().toISOString()` to PouchDB
  - Error if unable to save file
- On "delete", remove the current file from PouchDB.
  - Error if no file is currently loaded from the database.
- On "delete all", remove all note entries from PouchDB.
  - Error if unable to remove all entries.

Future:
- Provide a list of files stored in PouchDB
- Load a file from list by clicking it
- Delete a file from list by using "Delete" button

// Previous functions

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
// function saveToDB() {
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

*/

// ===============
// DB Controller

const db = new PouchDB("note");
const remoteCouch = false;

let content = document.getElementById("content").innerText.toString();

function addNote(body) {
  const identifier = new Date().toISOString()

  const noteData = {
    _id: identifier,
    title: identifier,
    body: body
  };

  db.put(noteData, function callback(err, result) {
    if (!err) {
      console.log('Successfully added a new note.');
    }
  });
}

// let note = await getNote("2025-02-12T21:14:40.436Z")
async function getNote(id) {
  return await db.get(id)
}

/*

Updated records in PouchDB need to have an additional `_rev` field

const noteData = {
  _id: identifier,
  _rev: new Date().toISOString()
  title: identifier,
  body: body
};

*/
async function updateNote(noteData) {
  return await db.put(noteData)
}

function showNotes() {
  db.allDocs({include_docs: true, descending: true}, function(err, doc) {
    console.log(doc.rows);
  });
}

function removeNote(noteObject) {
  db.remove(noteObject)
}

// =========
// Messages

/*
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
*/


// =========
// GUI Controller

/*
function execOnLoad() {
  loadFileByUrl();
  // storage[1:2] = msg, action;
  if (storage.length > 3) {
    document.getElementById("showmult").style.display = "block";
  }
}
function updateHelp(text) {
  let help = document.getElementById("help");
  help.innerHTML = text;
}
  unction getLocation() {
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
function displaySavedFiles() {
  Object.keys(localStorage).forEach((item, i) => {
    let title = item;
    let content = localStorage[item];
  })
}

*/