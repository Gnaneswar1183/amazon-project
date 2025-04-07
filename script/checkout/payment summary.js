import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/delivery.js";


export function renderPaymentSummary(){
    let productPriceCents=0;
    let shippingPriceCents=0;
    // cart.forEach((cartItem) => {
    //     console.log(`Cart Item Delivery ID: ${cartItem.deliveryId}`);
    
    //     const deliveryOption = getDeliveryOption(cartItem.deliveryId);
    //     console.log("Retrieved Delivery Option:", deliveryOption);
    
    //     if (deliveryOption) {
    //         shippingPriceCents += deliveryOption.priceCents;
    //     } else {
    //         console.warn(`No delivery option found for ID: ${cartItem.deliveryId}`);
    //     }
    // });
    

    
    cart.forEach((cartItem)=>{
      const product=  getProduct(cartItem.productId);

      productPriceCents+=product.priceCents * cartItem.quantity;

      const deliveryOption=
        getDeliveryOption(cartItem.deliveryId);
        shippingPriceCents+=deliveryOption.priceCents;
    });

    const totalBeforeTax=productPriceCents+shippingPriceCents;
    const taxCents= Math.round(totalBeforeTax*0.1) ;
    const totalCents=totalBeforeTax + taxCents;

    const paymentSummaryhtml =
    `<div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (3):</div>
    <div class="payment-summary-money">
    ₹${productPriceCents.toFixed(2)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">₹${shippingPriceCents.toFixed(2)}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">₹${totalBeforeTax.toFixed(2)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">₹${taxCents}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">₹${totalCents.toFixed(2)}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>`;

  document.querySelector('.js-payment-summary').innerHTML =paymentSummaryhtml;
}      