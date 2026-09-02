"use client";

import {
  createCheckoutSession,
  getProducts,
  getStripePayments,
  Product,
} from "@invertase/firestore-stripe-payments";
import app from "../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

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

const goToBillingPortal = async () => {
  const instance = getFunctions(app, "us-central1");
  const functionRef = httpsCallable(
    instance,
    "ext-firestore-stripe-payments-createPortalLink",
  );

  await functionRef({
    returnUrl: `${window.location.origin}/account`,
  })
    .then(({ data }: any) => window.location.assign(data.url))
    .catch((error) => console.log(error.message));
};

export { loadCheckout, fetchActiveProducts, goToBillingPortal };
export default payments;
