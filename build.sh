echo "Wwitching to branch master"
git checkout master

echo "Building app..."
npm run build

echo "copying the build folder to public folder"
cp -r build ./main

echo "running the server"
python manage.py runserver