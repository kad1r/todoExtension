"use strict";

chrome.runtime.onInstalled.addListener(function () {
    console.log("todo extension is running!");

    document.addEventListener('DOMContentLoaded', function () {
        console.log("dom loded");
        var createButton = document.getElementById("createListItem");
        console.log(createButton);
        createButton.addEventListener('click', function () {
            alert("clicked!");
        });
    });

    try {
        if (typeof (Storage) == 'undefined') {
            alert("Your browser doesn't support localStorage. This extension can't work without localStorage.");
            return false;
        }

        if (localStorage != null) {
            localStorage.clear();
            console.log("storage is ok");

            if (!localStorage.getItem("todoDB")) {
                console.log("create new localStorage db");
                createStorage();
            } else {
                var list = getStorageItems();
            }
        }
    } catch (error) {

    }


});

const STATUS = {
    ACTIVE: 1,
    PASSIVE: 0,
    DONE: 2,
    POSTPONED: 3
}

window.addEventListener('load', function load(event) {
    checkLocalStorage();
});

function checkLocalStorage() {
    if (typeof (Storage) == 'undefined') {
        alert("Your browser doesn't support localStorage. This extension can't work without localStorage.");
        return false;
    }
}

// document.getElementById("createListItem").onclick = function () {
//     alert("xx");
//     // var list = JSON.parse(localStorage.getItem("todoDB")),
//     //     obj = {
//     //         "category": null,
//     //         "title": "test",
//     //         "description": document.getElementById("description").value,
//     //         "dateCreated": new Date(),
//     //         "dateUpdated": null,
//     //         "status": STATUS.ACTIVE
//     //     };

//     // list.push(obj);

//     // localStorage.setItem("todoDB", JSON.stringify(list));
//     // console.log(localStorage.getItem("todoDB"));
// };