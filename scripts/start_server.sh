#!/bin/bash
cd /home/ec2-user/student-management-app
npm install -g pm2
pm2 start server.js --name student-management-app