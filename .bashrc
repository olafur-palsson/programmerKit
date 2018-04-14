
# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# don't put duplicate lines or lines starting with space in the history.
# See bash(1) for more options
HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
HISTSIZE=1000
HISTFILESIZE=2000

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# If set, the pattern "**" used in a pathname expansion context will
# match all files and zero or more directories and subdirectories.
#shopt -s globstar

# make less more friendly for non-text input files, see lesspipe(1)
[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

# set variable identifying the chroot you work in (used in the prompt below)
if [ -z "${debian_chroot:-}" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

# set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
    xterm-color|*-256color) color_prompt=yes;;
esac

# uncomment for a colored prompt, if the terminal has the capability; turned
# off by default to not distract the user: the focus in a terminal window
# should be on the output of commands, not on the prompt
#force_color_prompt=yes

if [ -n "$force_color_prompt" ]; then
    if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
	# We have color support; assume it's compliant with Ecma-48
	# (ISO/IEC-6429). (Lack of such support is extremely rare, and such
	# a case would tend to support setf rather than setaf.)
	color_prompt=yes
    else
	color_prompt=
    fi
fi

if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
unset color_prompt force_color_prompt

# If this is an xterm set the title to user@host:dir
case "$TERM" in
xterm*|rxvt*)
    PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
    ;;
*)
    ;;
esac

# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    #alias dir='dir --color=auto'
    #alias vdir='vdir --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi

# colored GCC warnings and errors
#export GCC_COLORS='error=01;31:warning=01;35:note=01;36:caret=01;32:locus=01:quote=01'

# some more ls aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

# Add an "alert" alias for long running commands.  Use like so:
#   sleep 10; alert
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.

if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi

# enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi


## CUSTOM SETTINGS

alias bashs="source ~/.bashrc"
# Reload Bash Source

## SETUP TOOLS

gen='~/.genericFiles/'
setup=$gen'setupscripts/'
alias setupall='cat '$setup ' | bash'
# Setup environment by executing all scripts in ~.genericFIles/setupScripts/

alias setuptmux=$setup'tmuxsetup.sh'
# Setup Tmux 

backupAtom() {
# Backup atom package list
	touch ~/.atom/packages.list
	apm list --installed --bare > ~/.atom/packages.list
	echo "Done"
}

setupAtom() {
# Install atom package list
	sudo apt-get install atom
	apm install --packages-file .atom/packages.list
	echo "Done"
}



## SHORTCUTS

alias wwwroot='cd /var/www/html'
# Go to apache server root
alias sdkmanager="~/Downloads/android/tools/bin/sdkmanager"
# Shortcut to Android SDK Manager
alias server='ssh root@165.227.41.109'
# DigitalOcean Personal Server


alias cppfolder='cd ~/MEGA/_Skoli/c++'
# Skolashortcut
alias pythonfolder='cd ~/MEGA/_Skoli/python'
# Skolashortcut
alias uifolder='cd ~/MEGA/_Skoli/UI'
# Skolashortcut
alias g++='g++ -std=c++17'
# Default Standard for C++ is 2017
alias hotelsearchjar='cd /home/pimp-of-pimps/projects/search/server/initial/build/libs/'
# Current Poject
alias hotelsearch='cd ~/projects/search'
# Current Poject
alias hotelsearchsrc='cd ~/projects/search/server/initial/src/main/'
# Current Poject




## TERMINAL TOOLS

alias update='sudo apt-get update; sudo apt-get upgrade -y'
# Update and upgrade all

export PATH="/home/pimp-of-pimps/anaconda/bin:$PATH"
# added by Anaconda 2.3.0 installer

alias kjq="cat > ~/.clipboard; qjk | xclip -selection c"
# Clipboard Copy
alias qjk="cat ~/.clipboard"
# Clipboard Paste
alias v="head -1 ~/.clipboard"
# Paste first line for inline command. Example $(v).

#docker always sudo
alias docker="sudo docker"


## ERRORS FIXES

# apt-get update

# GPG error: https://apt.dockerproject.org/repo ubuntu-xenial InRelease: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY F76221572C52609D
alias addkey="sudo apt-key adv --keyserver pgp.mit.edu --recv-keys" 
# and then something like F76221572C52609D to solve 'NO_PUBKEY ...' Error during apt-get update


## TMUX COMMANDS 

alias tmuxhelp="nvim ~/.genericFiles/tmux/tmuxa.md"
	# Manual for Tmux
alias tmuxhelpb="nvim ~/.genericFiles/tmux/tmuxb.md"
	# Manual for Tmux, other
alias tls="tmux ls"
	# List al tmux sessions running

tkill() { 
# Kill session
	name="$1"
	tmux kill-session -t $name
}

tnew() { 
# New session
	name="$1"
	tmux new -s $name
}

t() { 
# Attach to session $1
	name="$1"
	tmux a -t $name
}

alias tkillall="tmux ls | grep : | cut -d. -f1 | awk '{print substr($1, 0, length($1)-1)}' | xargs kill"
# Kill all tmux sessions

## SOME PYTHON TOOLS

alias upgradepip3="pip3 list --outdated | cut -d ' ' -f1 | tail -n +3 | xargs pip3 install --upgrade"
alias upgradepip2="pip list --outdated | cut -d ' ' -f1 | tail -n +3 | xargs pip install --upgrade"
upgradepip() {
	# Upgrade pip, use upgradepip2 or upgradepip3 to only upgrade those
	upgradepip3
	upgradepip2
}


## SOME JAVA TOOLS  

alias uninstalljava="sudo ~/.genericFiles/uninstallJava.sh"
# Uninstalls all of Java

newMavenProject() {
# Make a new Maven project in current directory
	groupId="$1"
	artifactName="$2"

	mvn archetype:generate -DgroupId=$groupId -DartifactId=$artifactName -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
	cp "~/.genericFiles/pom.xml" $2
}

alias mvntest="mvn test -Dtest=*"
# Test all files in src/test/ with Maven


## GIT
alias githardreset='git fetch --all; git reset --hard origin/master'
# Force get the latest updates from master

pullurl() {
# Pull the url in $1
	git init
	git remote add origin "$1"
	git pull origin master
}

$defaultGitBranch="master"

pushto() {
	if [ "$1" == "" ]
	then
		echo "No branch name"
		return 1
	fi

	if [ "$2" == "" ]
	then
		echo "No commit message"
		return 1
	fi

	git add .
	git commit -m "$2"
	git push origin "$1"
}

push() {
	pushto $defaultBranch $1
}

pushtomaster() {
	pushto "master" $1
}

setpushdefault() {
	defaultBranch="$1"
}

