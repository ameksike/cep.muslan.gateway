# Gateway Demo Project 
It is a demo written on JavaScript over NodeJS for REST API Server. Is very simple project with one used Express, MongoDB.


# install steps: Server REST 
- git clone https://github.com/ameksike/cep.muslan.gateway.git
- cd cep.muslan.gateway/server.express/
- npm install 
- npm start
- npm run test

# install steps: Client REST Angular
- git clone https://github.com/ameksike/cep.muslan.gateway.git
- cd cep.muslan.gateway/client.angular/
- npm install 
- npm start


# Description
This sample project is managing gateways - master devices that control multiple peripheral devices. Your task is to create a REST service (JSON/HTTP) for storing information about these gateways and their associated devices. This information must be stored in the database. When storing a gateway, any field marked as “to be validated” must be validated and an error returned if it is invalid. Also, no more that 10 peripheral devices are allowed for a gateway. The service must also offer an operation for displaying information about all stored gateways (and their devices) and an operation for displaying details for a single gateway. Finally, it must be possible to add and remove a device from a gateway.
