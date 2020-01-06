# EXPRESS MONGODB REST Gateway Demo Project 
It is a demo written on JavaScript over NodeJS for REST API Server. Is very simple project with one used Express, MongoDB.

# install steps
- git clone https://github.com/ameksike/cep.muslan.gateway.git
- cd cep.muslan.gateway/server.express/
- npm install 

# run steps
- npm start
- http://localhost:3000/gateway/fill

# develop steps
- npm init
- npm install express cors body-parser mongoose
- npm install nodemon -D
- npm run dev 

# RESTfull request format:  method => PUT | POST | DELETE | GET 
- http://localhost:3000/gateway/77/
- http://localhost:3000/gateway/77/peripheral/99

# RESTfull response format:
- {
    "message": "the message content",
    "status": value => true | false,
    "data": value => [] | {} 
}

# Description
This sample project is managing gateways - master devices that control multiple peripheral devices. Your task is to create a REST service (JSON/HTTP) for storing information about these gateways and their associated devices. This information must be stored in the database. When storing a gateway, any field marked as “to be validated” must be validated and an error returned if it is invalid. Also, no more that 10 peripheral devices are allowed for a gateway. The service must also offer an operation for displaying information about all stored gateways (and their devices) and an operation for displaying details for a single gateway. Finally, it must be possible to add and remove a device from a gateway.

# Each gateway has:
- unique serial number (string), 
- human-readable name (string),
- IPv4 address (to be validated),
- multiple associated peripheral devices. 

# Each peripheral device has:
- UID (number),
- vendor (string),
- date created,
- status - online/offline.


