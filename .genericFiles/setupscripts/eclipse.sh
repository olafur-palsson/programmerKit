sudo apt-get update

# Install umake and eclipse with it
sudo apt-get install ubuntu-make
sudo umake ide eclipse

# Create bundle directory
mkdir ~/.vim/bundle/eclim

# Install eclim for vim, pray this link doesn't change lol
wget https://github.com/ervandew/eclim/releases/download/2.7.2/eclim_2.7.2.bin
bash ./eclim_2.7.2.bin

