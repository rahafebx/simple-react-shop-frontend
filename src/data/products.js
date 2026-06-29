const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation. Enjoy your music without distractions. Perfect for travel and daily commutes.",
    price: 99.99,
    discount: 10,
    rate: 4.5,
    category: ["electronics", "audio"],
    image: "https://images.unsplash.com/photo-1612858249937-1cc0852093dd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Smartwatch",
    description: "A sleek smartwatch with fitness tracking and notifications. Stay connected and monitor your health on the go. Compatible with both Android and iOS devices.",
    price: 149.99,
    discount: 15,
    rate: 4.2,
    category: ["electronics", "wearables"],
    image: "https://images.unsplash.com/photo-1637160151663-a410315e4e75?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
    {
    id: 3,
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with excellent sound quality. Take your music anywhere and enjoy powerful audio. Water-resistant design for outdoor use.",
    price: 59.99,
    discount: 0,
    rate: 4.0,
    category: ["electronics", "audio"],
    image: "https://images.unsplash.com/photo-1669550071213-d5afca46ec78?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Gaming Mouse",
    description: "Ergonomic gaming mouse with customizable buttons. Enhance your gaming experience with precision and comfort. RGB lighting for a personalized touch.",
    price: 49.99,
    discount: 0,
    rate: 4.3,
    category: ["electronics", "gaming"],
    image: "https://images.unsplash.com/photo-1616296425622-4560a2ad83de?q=80&w=1013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D0",
  },
    {
    id: 5,
    name: "4K Monitor",
    description: "Ultra HD 4K monitor with vibrant colors and sharp details. Perfect for gaming, content creation, and productivity. Adjustable stand for ergonomic viewing.",
    price: 199.99,
    discount: 20,
    rate: 4.6,
    category: ["electronics", "computers"],
    image: "https://images.unsplash.com/photo-1592306219952-2f08be424a67?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    name: "Mechanical Keyboard",
    description: "Mechanical keyboard with customizable RGB lighting. Experience tactile feedback and precision for gaming and typing. Durable build for long-lasting performance.",
    price: 89.99,
    discount: 0,
    rate: 5,
    category: ["electronics", "computers"],
    image: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    name: "External Hard Drive",
    description: "Portable external hard drive with large storage capacity. Backup your files and access them on the go. Compatible with both Windows and Mac systems.",
    price: 79.99,
    discount: 0,
    rate: 4.1,
    category: ["electronics", "storage"],
    image: "https://plus.unsplash.com/premium_photo-1760531797911-f7b07b9572f1?q=80&w=1166&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 8,
    name: "Action Camera",
    description: "Compact action camera for capturing adventures in high definition. Waterproof and rugged design for outdoor activities. Includes mounting accessories for versatile filming.",
    price: 129.99,
    discount: 25,
    rate: 0,
    category: ["electronics", "cameras"],
    image: "https://images.unsplash.com/photo-1677172954692-90cf8bdc91e6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }
];

export function getProducts() {
  return products;
}

export function getProductById(id) {
  return products.find((product) => product.id === parseInt(id));
}

export function getProductsByCategory(category) {
  return products.filter((product) => product.category.includes(category));
}