export type Order = {
  id: string;
  items: { sku: string; qty: number }[];
  customer_id?: string;
  status: "cree" | "payee";
};

export type Payment = {
  id: string;
  order_id: string;
  method: "mobile_money" | "card";
  status: "pending" | "succeeded" | "failed";
};

export const db: {
  orders: Map<string, Order>;
  payments: Map<string, Payment>;
} = {
  orders: new Map<string, Order>(),
  payments: new Map<string, Payment>(),
};

export function newId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
}
