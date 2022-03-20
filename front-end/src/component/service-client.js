export function serviceClient(url, callback, body = {}) {
    // new Promise((resolve, reject) => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (err) {
            if (this.readyState == 4 && this.status == 200) {
                if(callback) callback(JSON.parse(xhttp.responseText), err)
            }
        };
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(body));
    // })
}