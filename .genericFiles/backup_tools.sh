

if [[ -z "$1" ]]; then 
  echo "Input commit message please";
  echo ""
  echo "backup 'This is a commit message for example'"
  exit;
fi

touch ~/projects/programmerkit

echo "Copying .bashrc..."
cp ~/.*bashrc ~/projects/programmerkit
echo "Copying .startuprc..."
cp ~/.startuprc ~/projects/programmerkit
echo "Copying .taskrc..."
cp ~/.taskrc ~/projects/programmerkit
echo "Copying .tmux.conf..."
cp ~/.tmux.conf ~/projects/programmerkit
echo "Copying .todo..."
cp ~/.todo ~/projects/programmerkit
echo "Copying vim stuff"
cp ~/.vimrc ~/projects/programmerkit
cp ~/.*.vim ~/projects/programmerkit
echo "Copying README.md..."
cp ~/README.md ~/projects/programmerkit
echo "Copying .genericFiles..."
cp ~/.genericFiles ~/projects/programmerkit -r
echo "Copying .kde..."
cp ~/.kde ~/projects/programmerkit -r
echo "Copying os config..."
cd ~/.config/

cp ~/.config ~/projects/programmerkit -r

cd ~/projects/programmerkit 

echo "Backing up atom package list...";
backupAtom

git init;
git remote add origin https://github.com/olafur-palsson/programmerKit;
git add .;
git commit -m "$1";
git push origin master;
