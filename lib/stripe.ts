"use client";

import {
  createCheckoutSession,
  getProducts,
  getStripePayments,
  Product,
} from "@invertase/firestore-stripe-payments";
import app from "../firebase";
import { getFunctions } from "firebase/functions";

const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});

const fetchActiveProducts = async (): Promise<Product[] | void> => {
  return getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error));
};

const loadCheckout = async (priceId: string) => {
  console.log("checkout attempt started");
  await createCheckoutSession(payments, {
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  })
    .then((snapshot) => window.location.assign(snapshot.url))
    .catch((error) => console.log(error.message));
  console.log("checkout attempt ended");
};

// const goToBillingPortal = async () => {
//   const instance = getFunctions()
// };

export { loadCheckout, fetchActiveProducts };
export default payments;
