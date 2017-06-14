function ajaxRequest (method, url, callback) {
    var xmlhttp = new XMLHttpRequest();

    if (method == "POST") {
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
        }
    };
    xmlhttp.open(method, url, true);
    xmlhttp.send();
}