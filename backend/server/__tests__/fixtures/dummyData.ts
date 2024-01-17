export const fakeProduct = {
  name: 'Airpods Wireless Bluetooth Headphones',
  image: 'airpods.jpg',
  description:
    'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
  brand: 'Apple',
  category: 'Electronics',
  price: 8999,
  count_in_stock: 10,
  rating: 4.5,
  num_reviews: 12,
};

export const fakeProduct2 = {
  name: 'iPhone 11 Pro 256GB Memory',
  image: 'phone.jpg',
  description:
    'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
  brand: 'Apple',
  category: 'Electronics',
  price: 59999,
  count_in_stock: 7,
  rating: 4.0,
  num_reviews: 8,
};

export const fakeUser = {
  name: 'Gustavo alves',
  email: 'example@example.com',
  password: 'this_is_my_passwDord25',
  birth_date: '2000-10-28',
  contact_number: '(31) 99999-9999',
  is_confirmed: false,
  is_admin: false
};

export const fakeUser2 = {
  name: 'João da silva',
  email: 'test@example.com',
  password: 'passwDord126',
  birth_date: '2000-10-28',
  contact_number: '(31) 99999-9999',
  is_confirmed: false,
  is_admin: false
};

export const fakeAdmin = {
  name: 'admin',
  email: 'admin@admin.com',
  password: 'passwDord126',
  birth_date: '2000-10-28',
  contact_number: '(31) 99999-9999',
  is_confirmed: true,
  is_admin: true
};

export const fakeAdmin2 = {
  name: 'admin',
  email: 'admin2@admin2.com',
  password: 'passwDord126',
  birth_date: '2000-10-28',
  contact_number: '(31) 99999-9999',
  is_confirmed: true,
  is_admin: true
};

export const fakeInitialCheckout = {
  total: 7480,
  subtotal: 5000,
  shippingCost: 2480,
  shipmentMethod: {
    name: 'Pac',
    value: 2480,
    code: '04510',
    deadline: '5',
    postalCode: '32603-235',
  },
  shipmentAddress: {
    state: 'MG',
    city: 'Betim',
    neighborhood: 'Guarujá',
    postal_code: '32603-235',
    street: 'Rua Iara',
  },
  products: [
    {
      id: 'c26ec4b6-2704-4855-873e-92a273798b94',
      name: 'Amazon Alexa',
      description:
        'ElectronicsElectronicsElectronicsElectronicsElectronicsElectronicsElectronicsElectronicsElectronicsElectronicsElectronicsElectronicsElectronicsElectronicsElectronicsElectronicsElectronicsElectronicsElectronicsElectronics',
      brand: 'dasadasdasd',
      category: 'Electronics',
      image: 'http://localhost:3333/uploads/products/1605213134056_alexa.jpg',
      price: 5000,
      count_in_stock: 1,
      rating: '4.0',
      num_reviews: 0,
      created_at: '2020-11-12T23:32:11.730Z',
      updated_at: '2020-11-16T23:02:57.890Z',
      qty: 1,
    },
  ],
};
