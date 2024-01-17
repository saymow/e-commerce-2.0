import { Cart } from "app/classes/CheckoutManager";


// {
//   "userId": "cad47cb5-3698-4696-9e3f-82562193f93e",
//   "checkoutId": "32271d9f-9276-485c-aef6-5bb7c7e329a6",
//   "cart": {
//     "products": [
//       {
//         "id": "0a4054bb-0450-4ee0-a581-b957dba0dd8c",
//         "name": "Airpods Wireless Headphones",
//         "description": "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
//         "brand": "Apple",
//         "category": "Electronics",
//         "image": "http://localhost:3333/uploads/products/1705433293006_airpods.jpg",
//         "price": 8999,
//         "count_in_stock": 10,
//         "rating": null,
//         "num_reviews": 0,
//         "created_at": "2024-01-16T22:28:13.089Z",
//         "updated_at": "2024-01-16T22:30:07.005Z",
//         "qty": 2
//       },
//       {
//         "id": "3ced88cc-7d03-43fc-88d9-ac411f368e8a",
//         "name": "iPhone 11 Pro 256GB",
//         "description": "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
//         "brand": "Apple",
//         "category": "Electronics",
//         "image": "http://localhost:3333/uploads/products/1705434437429_iphone11.jpeg",
//         "price": 59999,
//         "count_in_stock": 7,
//         "rating": null,
//         "num_reviews": 0,
//         "created_at": "2024-01-16T22:47:17.520Z",
//         "updated_at": "2024-01-16T22:47:17.520Z",
//         "qty": 2
//       },
//       {
//         "id": "2386c796-f7fd-4f57-b21d-e0ad7b785a79",
//         "name": "Cannon EOS 80D DSLR Camera",
//         "description": "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
//         "brand": "Cannon",
//         "category": "Electronics",
//         "image": "http://localhost:3333/uploads/products/1705434809046_cannon.webp",
//         "price": 92999,
//         "count_in_stock": 17,
//         "rating": null,
//         "num_reviews": 0,
//         "created_at": "2024-01-16T22:53:29.136Z",
//         "updated_at": "2024-01-16T22:53:29.136Z",
//         "qty": 1
//       }
//     ],
//     "shipmentMethod": {
//       "code": "express",
//       "name": "Express",
//       "value": 2000,
//       "deadline": "5",
//       "postalCode": "13560-560"
//     },
//     "total": 232995,
//     "subtotal": 230995,
//     "shippingCost": 2000,
//     "shipmentAddress": {
//       "state": "SP",
//       "city": "São Carlos",
//       "neighborhood": "Jardim Lutfalla",
//       "postal_code": "13560-560",
//       "street": "Rua Nove de Julho, apto 14",
//       "number": 2790
//     }
//   },
//   "paymentId": "0ND76357L3667022H",
//   "paymentSource": "paypal"
// }
class CreateOrderService {
  async execute(cart: Cart, userId: string, checkoutId: string, paymentId: string, paymentSource: string) {
    
  }
}
