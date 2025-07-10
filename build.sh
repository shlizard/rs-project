echo "Wwitching to branch master"
git checkout master

echo "collecting static"
python manage.py collectstatic

echo "Building app..."
npm run build