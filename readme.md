## Créer les .env:

### 1/ .env
```
MONGODB_CLIENT_URI=mongodb://mspr:mspr@localhost:27017/clients_db?authSource=admin
RabbitMQ_URI=amqp://mspr:mspr@localhost:5672
PORT_CLIENT=3001
JWT_SECRET=super-secret
NODE_ENV=development
SERVICE_SECRET=super-secure-token
```

### 2/ .env.docker
```
MONGODB_CLIENT_URI=mongodb://mspr:mspr@payetonkawa-mongo:27017/clients_db?authSource=admin
RabbitMQ_URI=amqp://mspr:mspr@payetonkawa-rabbitmq:5672
PORT_CLIENT=3001
JWT_SECRET=super-secret
NODE_ENV=development
SERVICE_SECRET=super-secure-token
```
