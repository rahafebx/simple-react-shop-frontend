const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1612858249937-1cc0852093dd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Smartwatch",
    description: "A sleek smartwatch with fitness tracking and notifications.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1637160151663-a410315e4e75?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
    {
    id: 3,
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with excellent sound quality.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1669550071213-d5afca46ec78?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Gaming Mouse",
    description: "Ergonomic gaming mouse with customizable buttons.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1616296425622-4560a2ad83de?q=80&w=1013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D0",
  },
    {
    id: 5,
    name: "4K Monitor",
    description: "Ultra HD 4K monitor with vibrant colors and sharp details.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1592306219952-2f08be424a67?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    name: "Mechanical Keyboard",
    description: "Mechanical keyboard with customizable RGB lighting.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    name: "External Hard Drive",
    description: "Portable external hard drive with large storage capacity.",
    price: 79.99,
    image: "https://plus.unsplash.com/premium_photo-1760531797911-f7b07b9572f1?q=80&w=1166&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 8,
    name: "Action Camera",
    description: "Compact action camera for capturing adventures in high definition.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1677172954692-90cf8bdc91e6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }
];

export function getProducts() {
  return products;
}