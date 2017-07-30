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
    document.getElementById("showTab").innerHTML = tableContent;
}