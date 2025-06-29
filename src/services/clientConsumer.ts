import { getChannel } from '../lib/rabbitmq.js';
import jwt from 'jsonwebtoken';
import { createNewClient } from './clients.service.js';

export async function consumeUserRegistered() {
  const channel = getChannel();
  const exchange = 'users';
  const queue = 'clients-api.user.registered';

  await channel.assertExchange(exchange, 'topic', { durable: true });
  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, 'user.registered');

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    try {
      const { token, data } = JSON.parse(msg.content.toString());
      const decoded = jwt.verify(token, process.env.SERVICE_SECRET!);

      if (typeof decoded !== 'object' || decoded.service !== 'auth-api') {
        console.warn('⚠️ Unauthorized service');
        return channel.nack(msg, false, false);
      }

      const clientData = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
      };

      const client = await createNewClient(clientData);
      console.log(`✅ Client auto-created from user.registered: ${client._id}`);
      channel.ack(msg);
    } catch (error) {
      console.error('❌ Error on user.registered:', error);
      channel.nack(msg, false, false);
    }
  });
}
