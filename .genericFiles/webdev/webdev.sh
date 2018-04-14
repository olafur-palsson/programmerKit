typeOfProject=$1
gitRepository=$2
gitRepository=$(echo $2 | sed 's/.git//')

git init .
touch .gitignore
git remote add origin $gitRepository".git" 
pushtomaster

sed 's/gitrepo/'$gitRepository'/' "~/.genericFiles/webdev/"$typeOfRepository"package.json" ./package.json

npm install
npm run dev

echo "Done."
