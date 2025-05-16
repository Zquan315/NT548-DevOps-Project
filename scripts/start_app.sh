#!/bin/bash
cd /home/ubuntu/student-management-app/client || { echo "Error: Cannot cd to client directory"; exit 1; }

# install react-script if not already installed
npm install react-scripts@5.0.1 --no-save
chmod +x ./node_modules/.bin/react-scripts

# run client
npm start > /home/ubuntu/student-management-app/client/frontend.log 2>&1 &
FRONTEND_PID=$!
sleep 20
if ! ps -p $FRONTEND_PID > /dev/null; then
  echo "Error: Frontend process failed to start"
  cat /home/ubuntu/student-management-app/client/frontend.log
  exit 1
fi

sleep 20 
if ! lsof -i :3000 > /dev/null; then
  echo "Error: Failed to start frontend"
  exit 1
fi
echo "start app completed"
exit 0