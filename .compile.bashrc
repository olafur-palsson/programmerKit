#!/bin/bash

# ------ MORPHO

alias morpho="java -jar ~/skoli/forritunarmal/morpho.jar"
alias morphoc="java -jar ~/skoli/forritunarmal/morpho.jar -c"

# ------ Rmarkdown
rmd() {
  R -e "rmarkdown::render('"$1"')" 
}

autocompilecpp() {
  # watch folder $1 for anything that matches $2 then on close_write do $3
  regex="(cpp|hpp)$";
  inotifywait -m "." -e close_write |
    while read path action file; do 
      filetocompile=$(echo "$file" | sed 's/hpp$/cpp/')
      echo "$file" | grep -Eq "$regex" \
        && tput reset \
        && $(g++ "$filetocompile" -c $(echo $filetocompile | sed 's/cpp/o/')) \
        && echo "$filetocompile compiled."
    done
}
#


