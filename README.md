 # Some help docs for this kit

#### So basically this thing is for fast setup and a powerful terminal. Really useful for servers / when changing operating systems n shit.
#### If you want to add your own command and still use the help option, just put a '# something something' below your 'alias' or function declaration, examples are in .bashrc ofc.

---
 ## First things first

  sobash

     # Reload Bash Source

  help

     # Get help documentation and uploads it to readme

  'helpv'

     # View the help docs in a vim viewer




 ## Setup tools

  setupall

     # Setup environment by executing all scripts in ~.genericFIles/setupScripts/

  setuptmux

     # Setup Tmux 

 backupAtom

     # Backup atom package list

 setupAtom

     # Install atom package list




 ## Shortcuts

  wwwroot

     # Go to apache server root

  sdkmanager

     # Shortcut to Android SDK Manager

  server

     # DigitalOcean Personal Server

  cppfolder

     # Skolashortcut

  pythonfolder

     # Skolashortcut

  uifolder

     # Skolashortcut

  g++

     # Default Standard for C++ is 2017

  hotelsearchjar

     # Current Poject

  hotelsearch

     # Current Poject

  hotelsearchsrc

     # Current Poject




 ## Terminal tools

  update

     # Update and upgrade all

     # added by Anaconda 2.3.0 installer

  kjq

     # Clipboard Copy

  qjk

     # Clipboard Paste

  v

     # Paste first line for inline command. Example $(v).

  sedpipe

     # Use sed with the pipe like this 'ls * | sedpipe "s/replaceThis/withThis/"' or some other s command

 sedall

     # Work in progress, I remember it was a good idea 

  docker

     #docker always sudo




 ## Errors fixes

     # apt-get update

     # GPG error: https://apt.dockerproject.org/repo ubuntu-xenial InRelease: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY F76221572C52609D

  addkey

     # and then something like F76221572C52609D to solve 'NO_PUBKEY ...' Error during apt-get update




 ## Tmux helper commands

  tmuxhelp

     	# Manual for Tmux

  tmuxhelpb

     	# Manual for Tmux, other

  tls

     	# List al tmux sessions running

 tkill

     # Kill session

 tnew

     # New session

 t

     # Attach to session $1

  tkillall

     # Kill all tmux sessions




 ## Some python tools

  pybook

  for 'jupyter notebook'

  upgradepip3

  upgradepip2

 upgradepip

     	# Upgrade pip, use upgradepip2 or upgradepip3 to only upgrade those




 ## Some java tools

  uninstalljava

     # Uninstalls all of Java

 newmavenproject

     # Make a new Maven project in current directory

  mvntest

     # Test all files in src/test/ with Maven




 ## Git

  githardreset

     # Force get the latest updates from master

 pullurl

     # Pull the url in $1

 getdefaultbranch

 setpushdefault

 commit

     # Commit with message $1

 pushto

     # Push to brach $1 with message $2

 push

     # Push to last pushed to branch with message as $1

