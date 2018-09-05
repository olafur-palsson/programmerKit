
# Add repos and update
sudo add-apt-repository ppa:webupd8team/atom
sudo apt-add-repository ppa:neovim-ppa/stable
sudo apt-get update
sudo add-apt-repository ppa:otto-kesselgulasch/gimp

# Taskwarrior
sudo apt-get install taskwarrior

# Tmux
sudo apt-get install tmux

# Java
sudo apt-get install openjdk-9-jdk-headless

# Neovim
sudo apt install libncurses5-dev libgnome2-dev libgnomeui-dev \
libgtk2.0-dev libatk1.0-dev libbonoboui2-dev \
libcairo2-dev libx11-dev libxpm-dev libxt-dev python-dev \
python3-dev ruby-dev lua5.1 liblua5.1-dev libperl-dev git
sudo apt-get install exuberant-ctags
sudo apt-get install python-dev python-pip python3-dev python3-pip
sudo apt-get install software-properties-common
sudo update-alternatives --install /usr/bin/vi vi /usr/bin/nvim 60
sudo update-alternatives --config vi
sudo update-alternatives --install /usr/bin/vim vim /usr/bin/nvim 60
sudo update-alternatives --config vim
sudo update-alternatives --install /usr/bin/editor editor /usr/bin/nvim 60
sudo update-alternatives --config editor
pip install upgrade pip
sudo pip install neovim

# Spotify
snap install spotify

# MEGASync
xdg-open https://mega.nz/sync

# Setup node 10+ and npm
sudo apt-get install -y build-essential
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install npm -g

# Setup Atom
sudo apt-get install atom

# Upgrade to latest
sudo apt-get upgrade

# Setup Gimp
sudo apt-get update
sudo apt-get install gimp

# Setup Eclipse
