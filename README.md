# BankApp-Demo
## 🚀 Run project
npm install
#### Frontend
```
docker build -t vue-app .
docker run -d -p 8080:80 vue-app
```
#### Backend
```
docker build -t node-server .
docker run -p 5000:5000 node-server
```
