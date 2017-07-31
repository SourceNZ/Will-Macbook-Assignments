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
function getBluImg(id) {
    var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brimg?id={" + id + "}";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        var resp = JSON.parse(xhr.responseText);
        return id;
    }
    xhr.send(null);
}
function showBluList(dest) {
    var tableContent = "<tr class='orderTitle'><td>BookID</td><td>Book Title</td></tr>\n";
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
function getId() {
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/booklist";
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        var version_d = document.getElementById("show_result");
        version_d.innerHTML = xhr.responseText;
    }
    xhr.send(null);
}

function showBookList(dest) {
    var tableContent = "<tr class='orderTitle'><td>Blu-Ray</td><td>Blu-Ray Title</td></tr>\n";
    for (var i = 0; i < dest.length; ++i) {
        var record = dest[i];
        if (i & 1 == 1) { // odd row
            tableContent += "<tr class='orderOdd'>";
        }
        else { // even row
            tableContent += "<tr class='orderEven'>";
        }
        //Try using the Id from the booklist.
        // var id1 = function getBluImg(find) {
        //     var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/bookimg?id={" + record.Id + "}";
        //     var xhr = new XMLHttpRequest();
        //     xhr.open("GET", uri, true);
        //     xhr.setRequestHeader("Accept", "application/json");
        //     xhr.onload = function () {
        //         var resp = JSON.parse(xhr.responseText);
        //         return resp;
                
        //     }
        //     xhr.send(null);

        // }
        //http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/bookimg?id=cb001
        //alert("http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/bookimg?id=" + record.Id);
        //alert("http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brimg?id={" + record.Id +"}" );
        tableContent += "<td>" + "<img src= http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/bookimg?id=" + record.Id + " height=150 width=100>" + "</td><td>" + record.Title + "</td></tr>\n";

    }
    document.getElementById("BookListTable").innerHTML = tableContent;
}

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


