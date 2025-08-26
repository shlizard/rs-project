echo "Watching to branch master"
git checkout master

echo "downloading all required library"
npm install

echo "Building app..."
npm run build

echo "collecting static"
python manage.py collectstatic