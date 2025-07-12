echo "Wwitching to branch master"
git checkout master

echo "Building app..."
npm run build

echo "running the server"
python manage.