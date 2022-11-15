echo "Heating up server!"

curl https://panimation-directory.dokku.bananabanana.me/

echo "Downloading entries"
curl https://panimation-directory.dokku.bananabanana.me/api/entries -o public/entries.json
echo "Downloading locations"
curl https://panimation-directory.dokku.bananabanana.me/api/locations -o public/locations.json
echo "Downloading skills"
curl https://panimation-directory.dokku.bananabanana.me/api/skills -o public/skills.json
echo "Downloading softwares"
curl https://panimation-directory.dokku.bananabanana.me/api/softwares -o public/softwares.json

echo "Rebuild frontend"
npm run build

echo "Uploading update"
aws s3 sync ./build s3://www.panimation.tv --exclude '.*' --acl public-read

echo "DONE"
