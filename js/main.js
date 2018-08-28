"use strict";

const STATUS = {
    ACTIVE: 1,
    PASSIVE: 0,
    DONE: 2,
    POSTPONED: 3
};

var list = localStorage.getItem("todoDB") !== null ? JSON.parse(localStorage.getItem("todoDB")) : [];

window.onload = function () {
    listItems();
    addEventListeners();
};

function addEventListeners() {
    document.getElementById("createListItem").addEventListener("click", createNewItem);

    var checkboxes = document.getElementById("todoItems").getElementsByTagName("input");

    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("change", deactivateItem);
    }
}

function createNewItem() {
    try {
        if (typeof (Storage) == 'undefined') {
            alert("Your browser doesn't support localStorage. This extension can't work without localStorage.");
            return false;
        }

        list = JSON.parse(localStorage.getItem("todoDB"));

        var obj = {
            "uuid": getNewGuid(),
            "category": null,
            "title": "test",
            "description": document.getElementById("description").value,
            "dateCreated": new Date(),
            "dateUpdated": null,
            "status": STATUS.ACTIVE,
            "priority": null,
            "timer": null
        };

        if (list === null) {
            list = [];
        }

        list.push(obj);
        localStorage.setItem("todoDB", JSON.stringify(list));
        document.getElementById("description").value = "";
        listItems();
        setHeight();
    } catch (error) {

    }
}

function deactivateItem(e) {
    var uuid = e.target.id,
        newStatus = STATUS.ACTIVE;

    if (e.target.checked) {
        newStatus = STATUS.DONE;
    }

    list.forEach(item => {
        if (item.uuid === uuid) {
            item.status = newStatus;
            item.dateUpdated = new Date();
        }
    });

    localStorage.setItem("todoDB", JSON.stringify(list));
    listItems();
}

function listItems() {
    if (list !== null && list.length > 0) {
        var todoItems = document.getElementById("todoItems"),
            listItems = JSON.parse(localStorage.getItem("todoDB"));

        while (todoItems.firstChild) {
            todoItems.removeChild(todoItems.firstChild);
        }

        listItems.forEach(el => {
            var li = document.createElement("li"),
                div = document.createElement("div");

            div.setAttribute("class", "checkbox");
            div.innerHTML = "<label " + (el.status === STATUS.DONE ? "style='text-decoration: line-through;'" : "") + "><input type='checkbox' " + (el.status === STATUS.DONE ? "checked" : "") + " id='" + el.uuid + "' />" + el.description + "</label>";
            li.appendChild(div);

            if (el.status === STATUS.DONE) {
                li.setAttribute("class", "list-group-item text-muted bg-done");
            } else {
                li.setAttribute("class", "list-group-item");
            }

            todoItems.appendChild(li);
        });
    } else {
        localStorage.clear();
        localStorage.setItem("todoDB", null);
    }

    addEventListeners();
    setHeight();
}

function setHeight() {
    // not working: chrome extesion has it's own control to make it fit on your screen
    // so, instead of using height, put paging (ex: every page contains 10 todo items)
    document.getElementById("main").height = screen.height - window.innerHeight * 0.2 + "px";
}

function getNewGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
