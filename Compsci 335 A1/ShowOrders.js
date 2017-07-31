function getBookList() {
    var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/booklist";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        var resp = JSON.parse(xhr.responseText);
        showBookList(resp);
    }
    xhr.send(null);
}
function getBluList() {
    var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brlist";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        var resp = JSON.parse(xhr.responseText);
        showBluList(resp);
    }
    xhr.send(null);
}

function showBluList(dest) {
    var tableContent = "<tr class='orderTitle'><td>Blu-Ray Cover</td><td>Blu-Ray Title</td></tr>\n";
    for (var i = 0; i < dest.length; ++i) {
        var record = dest[i];
        if (i & 1 == 1) { // odd row
            tableContent += "<tr class='orderOdd'>";
        }
        else { // even row
            tableContent += "<tr class='orderEven'>";
        }
        tableContent += "<td>" + "<img src= http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brimg?id=" + record.Id + " height=150 width=100>" + "</td><td>" + record.Title + "</td></tr>\n";
    }
    document.getElementById("BluListTable").innerHTML = tableContent;
}
function getComments() {
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/htmlcomments";
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        var version_d = document.getElementById("show_result");
        version_d.innerHTML = xhr.responseText;

    }
    xhr.send(null);
}

function showBookList(dest) {
    var tableContent = "<tr class='orderTitle'><td>Book Cover</td><td>Book Title</td></tr>\n";
    for (var i = 0; i < dest.length; ++i) {
        var record = dest[i];
        if (i & 1 == 1) { // odd row
            tableContent += "<tr class='orderOdd'>";
        }
        else { // even row
            tableContent += "<tr class='orderEven'>";
        }
        tableContent += "<td>" + "<img src= http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/bookimg?id=" + record.Id + " height=150 width=100>" + "</td><td>" + record.Title + "</td></tr>\n";

    }
    document.getElementById("BookListTable").innerHTML = tableContent;
}

function searchBlu() {
    var filter = document.getElementById("BluSearch").value.toUpperCase();
    var table = document.getElementById("BluListTable");
    var tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
function searchBooks() {
    var filter = document.getElementById("BookSearch").value.toUpperCase();
    var table = document.getElementById("BookListTable");
    var tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
function postComment() {
    var name = document.forms["comment"]["name"].value;
    var comment = document.forms["comment"]["comment"].value;
    if (name == "" || comment == "") {
        alert("Fields must be filled out");
    }
    else {
        var xhr = new XMLHttpRequest();
        var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/comment?name=" + name;
        xhr.open("POST", uri, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader("Content-Length", ""+ comment.length);
        xhr.send(JSON.stringify(comment));
        document.forms["comment"].reset();
    }
   
    // Host: redsox.uoa.auckland.ac.nz
    // Content-Length: 7
    // Content-Type: application/json

    // "Hello"
}
//        <form id="comment" onsubmit="postComment()">
//             <input type="text" id="name">
//             <textarea id="comment" rows="4" cols="50"></textarea>
//             <input type="submit" value="Submit">


var currentTab = "";
function showTabHome() {
    if (currentTab != "TabHome") {
        currentTab = "TabHome";
        showNoTabs();
        document.getElementById("SectionHome").style.display = "inline";
    }


}

function showTabBlu() {
    if (currentTab != "TabBlu") {
        currentTab = "TabBlu";
        showNoTabs();
        document.getElementById("SectionBlu").style.display = "inline";
    }
}

function showTabBooks() {
    if (currentTab != "TabBooks") {
        currentTab = "TabBooks";
        showNoTabs();
        document.getElementById("SectionBooks").style.display = "inline";
    }
}
function showTabRegister() {
    if (currentTab != "TabRegister") {
        currentTab = "TabRegister";
        showNoTabs();
        document.getElementById("SectionRegister").style.display = "inline";
    }
}
function showTabGuest() {
    if (currentTab != "TabGuest") {
        currentTab = "TabGuest";
        showNoTabs();
        document.getElementById("SectionGuest").style.display = "inline";
    }
}

function showNoTabs() {

    document.getElementById("SectionHome").style.display = "none";
    document.getElementById("SectionBlu").style.display = "none";
    document.getElementById("SectionBooks").style.display = "none";
    document.getElementById("SectionRegister").style.display = "none";
    document.getElementById("SectionGuest").style.display = "none";


}
window.onload = function () {
    showTabHome();
}




