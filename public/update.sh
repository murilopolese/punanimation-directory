echo "Heating up server!"

curl https://punanimation-directory.herokuapp.com

echo "Downloading entries"
curl https://punanimation-directory.herokuapp.com/api/entries -o public/entries.json
echo "Downloading locations"
curl https://punanimation-directory.herokuapp.com/api/locations -o public/locations.json
echo "Downloading skills"
curl https://punanimation-directory.herokuapp.com/api/skills -o public/skills.json
echo "Downloading softwares"
curl https://punanimation-directory.herokuapp.com/api/softwares -o public/softwares.json

echo "Rebuild frontend"
npm run build

echo "Uploading update"
aws s3 sync ./build s3://www.panimation.tv --exclude '.*' --acl public-read

echo "DONE"
