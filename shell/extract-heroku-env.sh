#!/bin/bash

read -p "Enter the project name: " proj_name

for x in $(heroku config -a=${proj_name}); do
  if [[ $x == HUBOT* ]]; then
    name=$x
  elif [ $x != '=>' ]; then
    value=$x
    export $name=$value
  fi
done

echo "Heroku config exported to environment:"
printenv | grep HUBOT
read -rsn1 -p "Press any key to continue"
echo
