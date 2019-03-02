#!/bin/bash

## Setup tools
alias setupkde="cp -avr .genericFiles/.config/ ~"
# Copies .config into homefolder, has kde settings in it
alias backup="bash ~/.genericFiles/backup_tools.sh"
alias setupall="run-parts -v --test $setup"
alias setuptmux=$setup'tmuxsetup.sh'

setupAll() {
# Execute all scripts that are in the setupscripts folder
	cd ~/.genericFiles/setupscripts/
	for file in *.sh; do
		bash "$file" || break
	done
	cd -
	echo "Done"
}

backupAtom() {
# Backup atom package list
	touch ~/projects/programmerkit/.atom.packages.list
	apm list --installed --bare > ~/projects/programmerkit/.atom.packages.list
	echo "Done"
}

setupAtom() {
# Install atom package list
	sudo apt-get install atom
	apm install --packages-file ~/projects/programmerkit/.atom.packages.list
	echo "Done"
}


