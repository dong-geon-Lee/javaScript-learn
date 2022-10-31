import add from './script.js';

console.log('exporting module');

const shippingCost = 10;
export const cart = [];

// Named export
export const addToCart = (product, quantity) => {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const taker = '비상';
const job = '개발자';

export { taker, job };
add(2, 3);

console.log(cart);
