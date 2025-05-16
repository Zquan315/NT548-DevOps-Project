#!/bin/bash
sudo apt update -y

# sudo apt remove nodejs npm -y
# sudo apt install -y curl ca-certificates gnupg apt-transport-https

# sudo rm -rf /etc/apt/sources.list.d/nodesource.list

if ! command -v node > /dev/null; then
  echo "Node.js not found, installing..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs || { echo "Error: Failed to install Node.js"; exit 1; }
fi


node --version
npm --version
npx --version

sudo chown -R ubuntu:ubuntu /home/ubuntu/student-management-app
sudo chmod -R 777 /home/ubuntu/student-management-app

cd /home/ubuntu/student-management-app
# server
cd server
echo "Installing backend dependencies..."
rm -rf node_modules package-lock.json
npm install
npm install @nestjs/mongoose mongoose
cd ..

# client
cd client
rm -rf node_modules package-lock.json
npm install
npm install axios
cd ..

echo "install_dependencies.sh completed"
exit 0