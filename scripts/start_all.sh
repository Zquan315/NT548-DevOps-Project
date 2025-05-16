#!/bin/bash
echo "Starting start_all.sh"
echo "Stopping processes on port 5000..."
sudo kill -9 $(sudo lsof -t -i:5000) 2>/dev/null || true
echo "Stopping processes on port 3000..."
sudo kill -9 $(sudo lsof -t -i:3000) 2>/dev/null || true
sleep 10
# run backend
echo "Running start_server.sh..."
bash /home/ubuntu/student-management-app/scripts/start_server.sh &
sleep 20
if [ $? -ne 0 ]; then
  echo "Error: start_server.sh failed"
  exit 1
fi

# wait backend running
sleep 20

# run frontend
echo "Running start_app.sh..."
bash /home/ubuntu/student-management-app/scripts/start_app.sh &
sleep 20
if [ $? -ne 0 ]; then
  echo "Error: start_app.sh failed"
  exit 1
fi
sleep 10
echo "start_all.sh completed"
exit 0