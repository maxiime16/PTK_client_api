import { getChannel } from '../lib/rabbitmq.js';
import jwt from 'jsonwebtoken';

export async function publishClientCreated(client: any) {
  const channel = getChannel();
  const exchange = 'clients';
  const routingKey = 'client.created';

  await channel.assertExchange(exchange, 'topic', { durable: true });

  const token = jwt.sign({ service: 'clients-api' }, process.env.SERVICE_SECRET!, {
    expiresIn: '5m',
  });

  channel.publish(
    exchange,
    routingKey,
    Buffer.from(
      JSON.stringify({
        event: routingKey,
        data: client,
        token,
      }),
    ),
    { persistent: true },
  );

  console.log(`📤 Published "client.created" for id=${client._id}`);
}
