import { CartService, FreebieCondition, FreebieReward } from "./cart";

const cart = CartService.create("customer_1");

// cart.add("1", 1);

const condition: FreebieCondition = { type: "contains", productId: "1" };
const reward: FreebieReward = { productId: "2", quantity: 1 };
cart.addFreebie("test", condition, reward);

cart.has("2"); // true
cart.count(); // 2
console.log("🚀 ~ file: index.ts:13 ~ cart:", cart);

cart.add("1", 1);
// console.log("🚀 ~ file: index.ts:16 ~ cart:", cart);
