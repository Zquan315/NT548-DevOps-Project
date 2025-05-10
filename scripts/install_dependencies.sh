#!/bin/bash
if ! command -v node &> /dev/null; then
    curl -fsSL https://rpm.nodesource.com/setup_21.x | bash -
    yum install -y nodejs
fi
cd /home/ec2-user/student-management-app
npm install
cd client
npm install
npm run build