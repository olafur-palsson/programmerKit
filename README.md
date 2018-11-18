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

  setupkde

     # Copies .config into homefolder, has kde settings in it

  setupall

 setupAll

     # Execute all scripts that are in the setupscripts folder

  setuptmux

     # Setup Tmux 




 ## Larvena

 backupAtom

     # Backup atom package list

 setupAtom

     # Install atom package list




 ## Shortcuts

  laverna

     # Laverna shortcut

  wwwroot

     # Go to apache server root

  sdkmanager

     # Shortcut to Android SDK Manager

  server

     # DigitalOcean Personal Server

  java8

  javac8




 ## Terminal tools

  seeya

     # Hibernate 

  bye

     # Shutdown

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

 sedpp

     # Sedpipe with less writing, use like 'ls * | sedpp replaceThis withThis'

 sedall

     # Work in progress, I remember it was a good idea 

  docker

     #docker always sudo




 ## Errors fixes

     # apt-get update

     # GPG error: https://apt.dockerproject.org/repo ubuntu-xenial InRelease: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY F76221572C52609D

  addkey

     # and then something like F76221572C52609D to solve 'NO_PUBKEY ...' Error during apt-get update




 ## Task Warrior

  tt

     # View what is due in the next 7 days on taskwarrior

  ttn

     # View next due task

  ttv

     # All containing the word 'Verk' (i.e. work material)

  ttvn




 ## Morpho alias

  morpho

     # run morpho

  morphoc




 ## Tmux helper commands

  tmuxhelp

     	# Manual for Tmux

  tmuxhelpb

     	# Manual for Tmux, other

  tls

     	# List al tmux sessions running

  t

     	# Attach to tmux session 'normal', handy for the tmux-resurrect megasession

 tkill

     # Kill session

 tnew

     # New session

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




 ## Cpp helpers

 newcpp

     # Creates a new cpp file with an acompanying header file as .cpp and .hpp

 gppp

     # compile with output file as 'filename.o' with std=c++17

