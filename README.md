# Deploy a Full-Stack React & NestJS Web Application using AWS CI/CD Pipeline
## Hướng dẫn chạy mã nguồn trên Windows
- Chạy Server backend
``` bash
  # cd server
  # npm run start:dev
```

- Chạy frontend
``` bash
  # cd client
  # npm start
```
## Hướng dẫn chạy mã nguồn trên ubuntu
- Chạy Server backend
``` bash
  # cd server
  # chmod +x node_modules/.bin/ts-node
  # npx ts-node src/main.ts
```
Hoặc có thể chạy file start_server.sh
``` bash
  bash scripts/start_server.sh
```
- Chạy frontend
``` bash
  # cd client
  # chmod +x ./node_modules/.bin/react-scripts
  # npm start
```
Hoặc có thể chạy file start_app.sh
``` bash
  bash scripts/start_app.sh
```
- Có thể chạy cả hai chỉ cần một lệnh
``` bash
  bash scripts/start_all.sh
```
- Nếu thiếu dependencies thì cần chạy
``` bash
  bash scripts/install_dependencies.sh
```
