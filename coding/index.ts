import {
  Cart,
  Discount,
  FreebieCondition,
  FreebieReward,
} from "./cart.service";

const cart = Cart.create("customer_1");

cart.add("product_1", 100);
console.log("🚀 ~ file: index.ts:6 ~ cart:", cart);

cart.add("product_1", 400);
console.log("🚀 ~ file: index.ts:9 ~ cart:", cart);

cart.update("product_1", 200);
console.log("🚀 ~ file: index.ts:12 ~ cart:", cart);

cart.remove("product_1");
console.log("🚀 ~ file: index.ts:15 ~ cart:", cart);

cart.add("product_1", 500);
console.log("🚀 ~ file: index.ts:18 ~ cart:", cart);

cart.update("product_1", 0);
console.log("🚀 ~ file: index.ts:21 ~ cart:", cart);

cart.destroy();

//! --------------------------------------------

// const cart = Cart.create("customer_2");

// cart.add("product_2", 300);
// console.log("🚀 ~ file: index.ts:30 ~ cart:", cart)

// const has = cart.has("product_2");
// console.log("🚀 ~ file: index.ts:33 ~ has:", has)

// const isEmpty = cart.isEmpty();
// console.log("🚀 ~ file: index.ts:36 ~ isEmpty:", isEmpty)

// const count = cart.count();
// console.log("🚀 ~ file: index.ts:39 ~ count:", count)

// const quantity = cart.quantity();
// console.log("🚀 ~ file: index.ts:42 ~ quantity:", quantity)

// const total = cart.total();
// console.log("🚀 ~ file: index.ts:45 ~ total:", total)

//! --------------------------------------------

// const cart = Cart.create("customer_3");

// cart.add("product_3", 25);
// console.log("🚀 ~ file: index.ts:52 ~ cart:", cart);

// const discount: Discount = { type: "percentage", amount: 10, max: 100 };

// let total = cart.total(); // 2500
// console.log("🚀 ~ file: index.ts:57 ~ total:", total);

// cart.addDiscount("10%", discount);
// total = cart.total(); // 2400
// console.log("🚀 ~ file: index.ts:61 ~ total:", total);

// cart.removeDiscount("10%");
// total = cart.total(); // 2500
// console.log("🚀 ~ file: index.ts:65 ~ total:", total);

//! --------------------------------------------

// const cart = Cart.create("customer_4");
// cart.add("1", 1);

// const condition: FreebieCondition = { type: "contains", productId: "1" };
// const reward: FreebieReward = { productId: "2", quantity: 1 };
// cart.addFreebie("get free 1", condition, reward);

// const has = cart.has("2"); // true
// console.log("🚀 ~ file: index.ts:77 ~ has:", has);

// const count = cart.count(); // 2
// console.log("🚀 ~ file: index.ts:80 ~ count:", count);
