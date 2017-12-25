function connectToServer(request, lastresponse) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            lastresponse(xhttp.response);
        }
    }
    xhttp.open('POST', '/server/demo-server.php', true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(request);
}

function pushToFile(filePath, filename, fileExtension, filecontent, response) {
    var filePath = filePath == null || filePath == '' ? ''  : '/' + filePath;
    var connection = connectToServer('push=true&file=true&filePath=storage' + filePath + '&filename=' + filename + '&fileExtension=' + fileExtension + '&filecontent=' + filecontent, response);
}

function pullFromFile(filePath, filename, fileExtension, response) {
    var filePath = filePath == null || filePath == '' ? ''  : '/' + filePath;
    var connection = connectToServer('file=true&filePath=storage' + filePath + '&filename=' + filename + '&fileExtension=' + fileExtension, response);
}