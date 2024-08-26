import { describe, expect, test } from "@jest/globals";
import {
  Cart,
  Discount,
  FreebieCondition,
  FreebieReward,
} from "./cart.service";

describe("Cart service testing", () => {
  describe("CRUD operations", () => {
    test("creates a new cart", () => {
      const cart = Cart.create("customer_1");
      expect(cart.isEmpty()).toBeTruthy();
      cart.destroy();
    });

    test("adds products to the cart", () => {
      const cart = Cart.create("customer_1");
      cart.add("product_1", 100);
      expect(cart.total()).toEqual(10000);
      cart.add("product_1", 400);
      expect(cart.total()).toEqual(50000);
      cart.destroy();
    });

    test("updates product quantity", () => {
      const cart = Cart.create("customer_1");
      cart.add("product_1", 100);
      cart.update("product_1", 200);
      expect(cart.total()).toEqual(20000);
      cart.destroy();
    });

    test("removes products from the cart", () => {
      const cart = Cart.create("customer_1");
      cart.add("product_1", 100);
      cart.remove("product_1");
      expect(cart.isEmpty()).toBeTruthy();
      cart.destroy();
    });

    test("clears the cart", () => {
      const cart = Cart.create("customer_1");
      cart.add("product_1", 500);
      cart.update("product_1", 0);
      expect(cart.isEmpty()).toBeTruthy();
      cart.destroy();
    });
  });

  describe("Utility methods", () => {
    test("checks if cart has a product", () => {
      const cart = Cart.create("customer_2");
      cart.add("product_2", 300);
      expect(cart.has("product_2")).toBeTruthy();
      expect(cart.has("product_3")).toBeFalsy();
      cart.destroy();
    });

    test("checks if the cart is empty", () => {
      const cart = Cart.create("customer_2");
      expect(cart.isEmpty()).toBeTruthy();
      cart.add("product_2", 300);
      expect(cart.isEmpty()).toBeFalsy();
      cart.destroy();
    });

    test("display list of items and quantity", () => {
      const cart = Cart.create("customer_2");
      cart.add("product_2", 300);
      expect(cart.count()).toContainEqual({
        productId: "product_2",
        quantity: 300,
      });
      cart.destroy();
    });

    test("calculates total quantity of products", () => {
      const cart = Cart.create("customer_2");
      cart.add("product_2", 300);
      expect(cart.quantity()).toBe(1);
      cart.add("product_3", 200);
      expect(cart.quantity()).toBe(2);
      cart.destroy();
    });

    test("calculates total price of the cart", () => {
      const cart = Cart.create("customer_2");
      cart.add("product_2", 300);
      expect(cart.total()).toBe(30000);
      cart.add("product_3", 200);
      expect(cart.total()).toBe(50000);
      cart.destroy();
    });
  });

  describe("Discount management", () => {
    test("applies a percentage discount with a maximum limit", () => {
      const cart = Cart.create("customer_3");
      cart.add("product_3", 25);
      const discountNamePercentage = "discount 10%, max 100";
      const discountPercentage: Discount = {
        type: "percentage",
        amount: 10,
        max: 100,
      };
      cart.addDiscount(discountNamePercentage, discountPercentage);
      expect(cart.total()).toBe(2400);
      cart.destroy();
    });

    test("removes a percentage discount", () => {
      const cart = Cart.create("customer_3");
      cart.add("product_3", 25);
      const discountNamePercentage = "discount 10%, max 100";
      const discountPercentage: Discount = {
        type: "percentage",
        amount: 10,
        max: 100,
      };
      cart.addDiscount(discountNamePercentage, discountPercentage);
      cart.removeDiscount(discountNamePercentage);
      expect(cart.total()).toBe(2500);
      cart.destroy();
    });

    test("applies a fixed discount", () => {
      const cart = Cart.create("customer_3");
      cart.add("product_3", 25);
      const discountNameFixed = "discount 500 unit";
      const discountFixed: Discount = { type: "fixed", amount: 500 };
      cart.addDiscount(discountNameFixed, discountFixed);
      expect(cart.total()).toBe(2000);
      cart.destroy();
    });

    test("removes a fixed discount", () => {
      const cart = Cart.create("customer_3");
      cart.add("product_3", 25);
      const discountNameFixed = "discount 500 unit";
      const discountFixed: Discount = { type: "fixed", amount: 500 };
      cart.addDiscount(discountNameFixed, discountFixed);
      cart.removeDiscount(discountNameFixed);
      expect(cart.total()).toBe(2500);
      cart.destroy();
    });
  });

  describe("Freebie management", () => {
    test("adds a freebie when condition is met", () => {
      const cart = Cart.create("customer_4");
      cart.add("1", 1);
      const condition: FreebieCondition = { type: "contains", productId: "1" };
      const reward: FreebieReward = { productId: "2", quantity: 1 };
      cart.addFreebie("get free 1", condition, reward);
      expect(cart.has("2")).toBeTruthy();
      expect(cart.count()).toHaveLength(2);
      cart.destroy();
    });
  });
});
