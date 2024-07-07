#!/bin/bash

# Loop through each file in the input directory
find "$1" -type f | while read -r _1; do
  # Extract the relative path and filename
  _2="$2/${_1#$1/}"

  # Create the output subdirectory if it doesn't exist
  mkdir -p "$(dirname "$_2")"

  # Detect the file type and apply the appropriate compression
  case "$_1" in
  *.mp4 | *.mkv | *.avi | *.mov | *.wmv) # Video files
    type='video'
    arg='-vcodec libx265 -crf 28 -preset medium -acodec aac -b:a 128k'
    ;;
  *.mp3 | *.wav | *.aac | *.flac) # Audio files
    type='audio'
    arg='-vf "scale=iw/2:ih/2"'
    ;;
  *.jpg | *.jpeg | *.png | *.gif | *.bmp) # Image files
    type='image'
    arg='-acodec aac -b:a 128k'
    ;;
  *)
    echo "Unsupported file type: $_1"
    ;;
  esac
  # echo "Compressed $type from $1 and saved to $2"
  echo "($type)$ ffmpeg -i $_1 $arg $_2"
  ffmpeg -i "$_1" $arg "$_2"
done
