# vx-lib.js
pushToFile(filePath, filename, fileExtension, fileContent, reponse)
pullFromFile(filePath, filename, fileExtension, reponse)
PUSHES and PULLS file using a file-server.php
Through the use XMLHttpRequest functipn.
Send file detail throught the follow parameters
filePath - The full path name to which the file is located e.g 'path/to/file'
filename - The full file name of the file e.g 'Foo'
fileExtension - The extension name of the file e.g 'txt' or 'js'
response - The callback function to execute that passes the xhr response when the file-server is succefully loaded.
           return The file content or File not found Errormessage.
fileContent - The string content that to be written to the file.
