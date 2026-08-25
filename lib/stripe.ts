import {
  createCheckoutSession,
  getProducts,
  getStripePayments,
} from "@invertase/firestore-stripe-payments";
// import { getFunctions, httpsCallable } from "@firebase/functions";
import app from "../firebase";

const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});

const products = await getProducts(payments, {
  includePrices: true,
  activeOnly: true,
})
  .then((res) => res)
  .catch((error) => console.log(error));

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

export { loadCheckout, products };
export default payments;
