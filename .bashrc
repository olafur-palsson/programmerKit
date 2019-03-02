
#!/bin/bash

# Load .bashrc here
if [ -f .init.bashrc      ]; then . .init.bashrc      ; fi # Very generic .bashrc
if [ -f .backup.bashrc    ]; then . .backup.bashrc    ; fi # Bacup tools
if [ -f .compile.bashrc   ]; then . .compile.bashrc   ; fi # Some compilation stuff
if [ -f .console.bashrc   ]; then . .console.bashrc   ; fi # Tools for bash
if [ -f .devops.bashrc    ]; then . .devops.bashrc    ; fi # Devops stuff
if [ -f .project.bashrc   ]; then . .project.bashrc   ; fi # Stuff related to current projects
if [ -f .vars.bashrc      ]; then . .vars.bashrc      ; fi # Path vars and more

## Current project shortcuts

alias velmodel="watch_do ./src '*pp' 'cmake . -DCMAKE_PREFIX_PATH=libtorch; make'"

## Variables

gen='~/.genericFiles/'
setup="$gen""setupscripts/" 
export PATH="$PATH:/home/pimp-of-pimps/anaconda/bin"
export PATH="$PATH:~/java8/java8"
export PYTHONSTARTUP="$HOME/.pythonrc"
export ANDROID_HOME="/usr/lib/android-sdk"

## Shortcuts

alias desktop="ssh pimp@130.208.144.53"
alias server='ssh root@138.68.155.75'
alias helpv="help; view README.md"
alias atom='taskset --cpu-list 1,2,3 atom'
alias blender="nohup ~/Downloads/blender-2.79b-linux-glibc219-x86_64/blender &"
alias astudio="nohup ~/Downloads/android-studio/bin/studio.sh &"
alias wwwroot='cd /var/www/html'
alias laverna="/usr/share/laverna-0.7.51-linux-x64/laverna"
# Laverna shortcut
alias sdkmanager="~/Downloads/android/tools/bin/sdkmanager"
# Shortcut to Android SDK Manager
# DigitalOcean Personal Server

alias docker="sudo docker"
#docker always sudo

alias t='tmux a -t "normal"'
# Attach to tmux session 'normal', handy for the tmux-resurrect megasession

alias pybook="jupyter notebook"
# Simple alias for 'jupyter notebook'

alias uninstalljava="sudo ~/.genericFiles/uninstallJava.sh"
# Uninstalls all of Java

## Calculator

alias calc="python -i ~/.calc.py"
alias calcedit="nvim ~/.calc.py"

## MISC


newcpp() {
  # Creates a new cpp file with an acompanying header file as .cpp and .hpp
  cppPath=$HOME"/.genericFiles/c++tools/"
  headerboiler=$cppPath"header.hpp"
  baseboiler=$cppPath"base.cpp"

  name=$1
  caps=$(echo $name | awk '{ print toupper($0) }')
  cat $baseboiler | sed "s/filename/$name/g" > $name.cpp
  cat $headerboiler | sed "s/filename/$name/g" | sed "s/capsname/$caps/g" > $name.hpp
}

gppp() {
  # compile with output file as 'filename.o' with std=c++17
  filename=$(echo $1 | cut -d'.' -f 1)
  g++ -o $filename'.o' $1 -std=c++14 
  unset $filename
}

