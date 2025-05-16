#!/bin/bash
# run server
cd /home/ubuntu/student-management-app/server || { echo "Error: Cannot cd to server directory"; exit 1; }

# install ts-node và typescript if not already installed
npm install ts-node@10.9.2 typescript@5.5.4 --no-save
chmod +x node_modules/.bin/ts-node

# run server
npx ts-node src/main.ts > /home/ubuntu/student-management-app/server/backend.log 2>&1 &
BACKEND_PID=$!
sleep 20

if ! ps -p $BACKEND_PID > /dev/null; then
  echo "Error: Backend process failed to start"
  cat /home/ubuntu/student-management-app/server/backend.log
  exit 1
fi
sleep 20 
if ! lsof -i :5000 > /dev/null; then
  echo "Error: Failed to start backend"
  exit 1
fi
echo "start server completed"
exit 0