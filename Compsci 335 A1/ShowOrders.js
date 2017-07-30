function getDestinations() {
    //var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/booklist";
    var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/booklist";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        var resp = JSON.parse(xhr.responseText);
        showDestinations(resp);
    }
    xhr.send(null);
}
function getId() {
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/booklist";
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        var version_d = document.getElementById("show_result");
        //alert(xhr.responseText);
        version_d.innerHTML = xhr.responseText;
    }
    xhr.send(null);
}

function showDestinations(dest) {
    var tableContent = "<tr class='orderTitle'><td>BookID</td><td>Book Title</td></tr>\n";
    for (var i = 0; i < dest.length; ++i) {
        var record = dest[i];
        if (i & 1 == 1) { // odd row
            tableContent += "<tr class='orderOdd'>";
        }
        else { // even row
            tableContent += "<tr class='orderEven'>";
        }
        tableContent += "<td>" + record.Id + "</td><td>" + record.Title + "</td></tr>\n";
    }
    document.getElementById("showTable").innerHTML = tableContent;
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


