#!/bin/bash

# Terminal

alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

alias sobash="source ~/.bashrc"
# Reload Bash Source

alias help="awk -f ~/.genericFiles/getdocumentation.awk ~/*.bashrc > ~/README.md; cat ~/README.md"
# Get help documentation and uploads it to readme

alias seeya='systemctl hibernate'
# Hibernate 

alias bye='sudo shutdown now'
# Shutdown

alias update='sudo apt-get update; sudo apt-get upgrade -y'
# Update and upgrade all

sedpp() {
# Sedpipe with less writing, use like 'ls * | sedpp replaceThis withThis'
	xargs sed -i 's/'$1'/'$2'/g'
}

alias sedpipe="xargs sed -i "$1
# Use sed with the pipe like this 'ls * | sedpipe "s/replaceThis/withThis/"' or some other s command

showcolors() {
# Display all 256 terminal colors
  for color in {0..255}; do
    printf "\e[38;5;%sm %s \n" $color $color
  done
}


# Probably the best bash function I have made
watch_do() {
  # Very useful. Syntax true if recursive:  watch_do src '*.js' 'npm run build' [true]
  regex="$2";
  cmd="$3";
  recursive="$4"
  rec=""
  text=""
  [[ $recursive = "true" ]] && rec="r"
  [[ $recursive = "true" ]] && text="recursively"
    
  echo "Executing          $cmd "
  echo "For all that match $regex "
  echo "In                 $1 " 
  echo "$text.";
  echo ""
  inotifywait -m"$rec"  "$1" -e close_write |
    while read path action file; do 
      echo "$file" | grep -Eq "$regex" && eval "$cmd"
    done
}

# GPG error: https://apt.dockerproject.org/repo ubuntu-xenial InRelease: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY F76221572C52609D
alias addkey="sudo apt-key adv --keyserver pgp.mit.edu --recv-keys" 
# and then something like F76221572C52609D to solve 'NO_PUBKEY ...' Error during apt-get update

filter_file() {
  list="$1"
  while read string; do
    grep -Fxv "$string" $list
  done
}

## Task Warrior
alias tt="task due.after:now-7days list"
# View what is due in the next 7 days on taskwarrior
alias ttn="task due.after:now-7days list | head -4; echo ' '"
# View next due task
alias ttv="tt | grep -e 'Verk'"
# All containing the word 'Verk' (i.e. work material)
alias ttvn="ttv | head -1"

alias upgradepip3="pip3 list --outdated | cut -d ' ' -f1 | tail -n +3 | xargs pip3 install --upgrade"
alias upgradepip2="pip list --outdated | cut -d ' ' -f1 | tail -n +3 | xargs pip install --upgrade"
upgradepip() {
	# Upgrade pip, use upgradepip2 or upgradepip3 to only upgrade those
	upgradepip3
	upgradepip2
}



