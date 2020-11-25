import Queue from 'bull';
import { redisConfig } from '../config/redis';

import * as jobs from '../jobs';

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, {
    ...job.options,
    redis: redisConfig,
  }),
  name: job.key,
  handle: job.handle,
}));

export default {
  queues,
  add(name: any, data: any) {
    const queue = this.queues.find(_queue => _queue.name === name);

    if (!queue) throw new Error(`${name} is a invalid queue.`);

    queue?.bull.add(data);
  },
  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job, err) => {
        console.log(`Job failed ${job.name}`.red);
        console.error(`${err}`.red);
      });
    });
  },
};
