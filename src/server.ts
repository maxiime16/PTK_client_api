import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { connectDB } from './config/mongoose.js';
import { connectRabbitMQ } from './lib/rabbitmq.js';
import ordersRouter from './routes/clients.routes.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

// Routes
app.use('/orders', ordersRouter);

const PORT_CLIENT = process.env.PORT_CLIENT;

async function startServer() {
  try {
    // On attend la connexion MongoDB et RabbitMQ
    await connectDB();
    await connectRabbitMQ();

    // Démarrer le consumer qui écoute

    // On démarre ensuite le serveur
    app.listen(PORT_CLIENT, () => {
      console.log(`✅ Evertything is OK, Cients API running on port ${PORT_CLIENT}`);
    });
  } catch (error) {
    console.error('Erreur lors du démarrage du serveur :', error);
    process.exit(1);
  }
}

startServer();
