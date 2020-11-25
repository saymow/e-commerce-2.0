import { ProcessCallbackFunction, QueueOptions } from 'bull';

import MailSenderService, { EmailProps } from '../lib/MailSenderService';

const mailSenderService = new MailSenderService();

const handle: ProcessCallbackFunction<EmailProps> = async ({ data }) => {
  await mailSenderService.execute(data);
};

const options: QueueOptions = {
  limiter: {
    max: 15,
    duration: 60 * 60,
  },
};

export default {
  key: 'UserConfirmationEmail',
  handle,
  options,
};
