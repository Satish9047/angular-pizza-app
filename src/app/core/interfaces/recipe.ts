export interface Inventory {
  pizzaBase: Recipe[];
  sauce: Recipe[];
  cheese: Recipe[];
  veggies: Recipe[];
  nonVeg: Recipe[];
}

export interface Recipe {
  _id: string;
  name: string;
  totalQuantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface UpdateRecipe {
  id: string;
  quantity: number;
}
