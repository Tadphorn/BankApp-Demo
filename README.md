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
## Demo User for Login
1. Risa
- Citizen ID: `1100600462802`
- Password: `12345`
- Account Number: `1123456789`
  
2. Somsri
- Citizen ID: `1122334455667`
- Password: `12345`
- Account Number: `0123456789`
