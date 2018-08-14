"use strict";

const STATUS = {
    ACTIVE: 1,
    PASSIVE: 0,
    DONE: 2,
    POSTPONED: 3
}

function createNewItem() {
    debugger;

    try {
        if (typeof (Storage) == 'undefined') {
            alert("Your browser doesn't support localStorage. This extension can't work without localStorage.");
            return false;
        }

        var list = JSON.parse(localStorage.getItem("todoDB")),
            obj = {
                "category": null,
                "title": "test",
                "description": document.getElementById("description").value,
                "dateCreated": new Date(),
                "dateUpdated": null,
                "status": STATUS.ACTIVE
            };

        list.push(obj);
        localStorage.setItem("todoDB", JSON.stringify(list));
    } catch (error) {

    }
}

function listItems() {
    document.getElementById("createListItem").addEventListener("click", createNewItem);

    var list = localStorage.getItem("todoDB");

    if (list != null) {
        var listItems = JSON.parse(localStorage.getItem("todoDB"));

    } else {
        localStorage.clear();
        localStorage.setItem("todoDB", null);
    }
}


window.addEventListener('load', listItems);