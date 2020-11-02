export default {
  createTransport() {
    return {
      async sendMail({ to }: { to: string }) {},
    };
  },
};
