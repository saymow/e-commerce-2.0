class Redis {
  data: Record<string, string | null>;

  constructor() {
    this.data = {};
  }

  async set(key: string, value: string) {
    this.data[key] = value;
  }

  async get(key: string) {
    return this.data[key];
  }

  async del(key: string) {
    this.data[key] = null;
  }
}

export default Redis;
