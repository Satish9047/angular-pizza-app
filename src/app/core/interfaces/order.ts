export interface Orders {
  _id: string;
  user: OrderUser;
  pizzaBase: OrderRecipe;
  sauceType: OrderRecipe;
  cheeseType: OrderRecipe;
  veggies: OrderRecipe[];
  nonVeg: OrderRecipe[];
  quantity: number;
  isDelivered: boolean;
  paid: boolean;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface PlaceOrder {
  pizzaBaseId: string;
  pizzaSauceId: string;
  pizzaCheeseId: string;
  pizzaVeggiesIds: string[];
  pizzaNonVegIds: string[];
  quantity: number;
  paid: boolean;
}

export interface CreateOrderResponse {
  user: string;
  pizzaBase: string;
  sauceType: string;
  cheeseType: string;
  veggies: string[];
  nonVeg: string[];
  quantity: number;
  isDelivered: boolean;
  paid: boolean;
  price: number;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface OrderRecipe {
  _id: string;
  name: string;
}
