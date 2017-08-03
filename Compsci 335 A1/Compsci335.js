var Globaluser = "";
var Globalpassword = "";
var loggedin = false;
var bookSelected = "";
var bluSelected = "";
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
    var tableContent = "<tr class='bluList'><td>Blu-Ray Cover</td><td>Blu-Ray Title</td><td >Purchase</td></tr>\n";
    for (var i = 0; i < dest.length; ++i) {
        var record = dest[i];
        if (i & 1 == 1) { // odd row
            tableContent += "<tr class='orderOdd'>";
        }
        else { // even row
            tableContent += "<tr class='orderEven'>";
        }
        tableContent += "<td>" + "<img src= http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brimg?id=" + record.Id + " height=150 width=100>" + "</td><td>" + record.Title + "</td><td><button id=" + record.Id + " onclick='buyBlu(this.id)'> BUY </button></td></tr>\n";
    }
    document.getElementById("BluListTable").innerHTML = tableContent;
}
function getComments() {
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/htmlcomments";
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    var version_d = document.getElementById("show_result");
    version_d.innerHTML = xhr.responseText;
    xhr.onload = function () {
        var version_d = document.getElementById("show_result");
        version_d.innerHTML = xhr.responseText;
    }
    xhr.send(null);
}
function showBookList(dest) {
    var tableContent = "<tr class='bookList'><td>Book Cover</td><td>Book Title</td><td>Purchase</td></tr>\n";
    for (var i = 0; i < dest.length; ++i) {
        var record = dest[i];
        if (i & 1 == 1) { // odd row
            tableContent += "<tr class='orderOdd'>";
        }
        else { // even row
            tableContent += "<tr class='orderEven'>";
        }
        tableContent += "<td>" + "<img src= http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/bookimg?id=" + record.Id + " height=150 width=100>" + "</td><td>" + record.Title + "</td><td><button id=" + record.Id + " onclick='buyBook(this.id)'> BUY </button></td></tr>\n";

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
        alert("Both fields must be filled out");
    }
    else {
        var xhr = new XMLHttpRequest();
        var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/comment?name=" + name;
        xhr.open("POST", uri, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader("Content-Length", "" + comment.length);
        xhr.send(JSON.stringify(comment));
        document.forms["comment"].reset();
        getComments();
    }
    document.getElementById("show_result").style.display = "none";
    getComments();
    document.getElementById("show_result").style.display = "inline";
}

function register() {
    Globaluser = document.forms["register"]["regname"].value;
    Globalpassword = document.forms["register"]["regpassword"].value;
    var address = document.forms["register"]["regaddress"].value;
    if (Globaluser == "" || Globalpassword == "" || address == "") {
        alert("All fields must be filled out");
    }
    else {
        var xhr = new XMLHttpRequest();
        var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/register";
        xhr.open("POST", uri, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        var user = {
            "Address": address,
            "Name": Globaluser,
            "Password": Globalpassword
        }
        xhr.setRequestHeader("Content-Length", "" + user.length);
        xhr.send(JSON.stringify(user));
        alert(xhr.responseText);
        document.forms["register"].reset();
        document.getElementById("showID").value = Globaluser;
        document.getElementById("showID").innerHTML = Globaluser;
        alert("Registered Successfully! You have been logged in");
        loggedin = true;
    }

}

function login() {
    e =  bluSelected;
    alert(e + "this is after show tab login is called");
    Globaluser = document.forms["login"]["logname"].value;
    Globalpassword = document.forms["login"]["logpassword"].value;
    if (Globaluser == "" || Globalpassword == "") {
        alert("Both fields must be filled out");
    }
    else {
        var xhr = new XMLHttpRequest();
        var uri = "http://redsox.uoa.auckland.ac.nz/BC/Closed2/Service.svc/brbuy?id=" + e;
        xhr.open("GET", uri, false);
        xhr.setRequestHeader("Authorization", "Basic " + btoa(Globaluser + ":" + Globalpassword));
        xhr.send("");
        alert(xhr.status);
    }
    if (xhr.status == 200) {
        alert("Server code: " + xhr.status + ", User Authenticated");
        document.getElementById("showID").innerHTML = Globaluser;
        loggedin = true;
        alert("LOGGED IN AS: " + Globaluser);
        alert(xhr.responseText);
        document.forms["login"].reset();
    } else {
        alert("Incorrect username and/or password.");
    }
    showTabHome();

}


function buyBlu(e) {
    if (loggedin == true) {
        var xhr = new XMLHttpRequest();
        var uri = "http://redsox.uoa.auckland.ac.nz/BC/Closed2/Service.svc/brbuy?id=" + e;
        xhr.open("GET", uri, false);
        xhr.setRequestHeader("Authorization", "Basic " + btoa(Globaluser + ":" + Globalpassword));
        xhr.send("");
        alert(xhr.responseText);
    }
    else if (loggedin == false) {
        showTabLogin();
        bluSelected = e;
        showBluList();
        
    }

}
function buyBook(e) {
    if (loggedin == true) {
        var xhr = new XMLHttpRequest();
        var uri = "http://redsox.uoa.auckland.ac.nz/BC/Closed2/Service.svc/bookbuy?id=" + e;
        xhr.open("GET", uri, false);
        xhr.setRequestHeader("Authorization", "Basic " + btoa(Globaluser + ":" + Globalpassword));
        xhr.send("");
        alert(xhr.responseText);
    }
    else if (loggedin == false) {
        showTabLogin();
        bookSelected = e;
        showBookList();
    }

}

function logout() {
    loggedin = false;
    Globaluser = "";
    Globalpassword = "";
    alert("Logged Out Successfully");

    document.getElementById("showID").innerHTML = "Not Logged In";

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
function showTabLogin() {
    if (currentTab != "TabLogin") {
        currentTab = "TabLogin";
        showNoTabs();
        document.getElementById("SectionLogin").style.display = "inline";
    }
}

function showNoTabs() {

    document.getElementById("SectionHome").style.display = "none";
    document.getElementById("SectionBlu").style.display = "none";
    document.getElementById("SectionBooks").style.display = "none";
    document.getElementById("SectionRegister").style.display = "none";
    document.getElementById("SectionGuest").style.display = "none";
    document.getElementById("SectionLogin").style.display = "none";



}
window.onload = function () {
    showTabHome();
    getBookList();
    getBluList();
    getComments();

}






    // xhr.setRequestHeader("Content-Length", "" + Globaluser.length + Globalpassword.length);
    // xhr.open("POST", uri, true, Globaluser, Globalpassword);
    // xhr.setRequestHeader("Authorization", "Basic " + btoa(Globaluser+":"+Globalpassword));
    // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // var user = {
    //     "Name": Globaluser,
    //     "Password": Globalpassword
    // }
    // xhr.send();
    // alert(xhr.status);
    // alert(JSON.parse(xhr.response));

