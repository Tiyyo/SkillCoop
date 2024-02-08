echo "Stop all apps"
pm2 kill

echo "Pulling latest code"
git pull origin main

echo "Install dependencies"
sudo pnpm Install

echo "Build the project"
sudo pnpm schema build
sudo pnpm date build
sudo pnpm types build
sudo pnpm api build 
sudo pnpm chat build

echo "Migration the database"
sudo pnpm api db:migrate:deploy

echo "Start all apps"
sudo pm2 start skillcoop-pm2.json
