interface CartItem {
  productId: string;
  quantity: number;
}

export interface Discount {
  type: "fixed" | "percentage";
  amount: number;
  max?: number;
}

export interface FreebieCondition {
  type: "contains";
  productId: string;
}

export interface FreebieReward {
  productId: string;
  quantity: number;
}

const PRICE_PER_PIECE = 100;

export class Cart {
  private static carts: Map<string, Cart> = new Map();

  private customerId: string;
  private items: Map<string, CartItem> = new Map();
  private discounts: Map<string, Discount> = new Map();
  private freebies: Map<
    string,
    { condition: FreebieCondition; reward: FreebieReward }
  > = new Map();

  private constructor(customerId: string) {
    this.customerId = customerId;
  }

  static create(customerId: string): Cart {
    if (!this.carts.has(customerId)) {
      this.carts.set(customerId, new Cart(customerId));
    }
    return this.carts.get(customerId)!;
  }

  has(productId: string): boolean {
    return this.items.has(productId);
  }

  isEmpty(): boolean {
    return this.items.size === 0;
  }

  count(): CartItem[] {
    return Array.from(this.items.values());
  }

  quantity(): number {
    return this.items.size;
  }

  total(): number {
    let total = Array.from(this.items.values()).reduce(
      (acc, item) => acc + item.quantity * PRICE_PER_PIECE,
      0
    );

    total = this.applyDiscounts(total);

    return total;
  }

  private applyDiscounts(total: number): number {
    this.discounts.forEach((discount) => {
      if (discount.type === "percentage") {
        let discountValue = (total * discount.amount) / 100;
        if (discount.max !== undefined) {
          discountValue = Math.min(discountValue, discount.max);
        }
        total -= discountValue;
      } else if (discount.type === "fixed") {
        total -= discount.amount;
      }
    });
    return total;
  }

  addDiscount(name: string, discount: Discount): void {
    this.discounts.set(name, discount);
  }

  removeDiscount(name: string): void {
    this.discounts.delete(name);
  }

  add(productId: string, quantity: number): void {
    this.validateQuantity(quantity);
    const item = this.items.get(productId);
    if (item) {
      item.quantity += quantity;
    } else {
      this.items.set(productId, { productId, quantity });
    }
  }

  update(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.remove(productId);
    } else {
      this.items.set(productId, { productId, quantity });
    }
  }

  remove(productId: string): void {
    this.items.delete(productId);
  }

  destroy(): void {
    Cart.carts.delete(this.customerId);
  }

  addFreebie(
    name: string,
    condition: FreebieCondition,
    reward: FreebieReward
  ): void {
    this.validateQuantity(reward.quantity);
    this.freebies.set(name, { condition, reward });
    this.applyFreebie(condition, reward);
  }

  private applyFreebie(
    condition: FreebieCondition,
    reward: FreebieReward
  ): void {
    if (condition.type === "contains" && this.has(condition.productId)) {
      const rewardItem = this.items.get(reward.productId);
      if (rewardItem) {
        rewardItem.quantity += reward.quantity;
      } else {
        this.items.set(reward.productId, {
          productId: reward.productId,
          quantity: reward.quantity,
        });
      }
    }
  }

  private validateQuantity(quantity: number): void {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than 0.");
    }
  }
}
