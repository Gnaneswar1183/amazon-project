import {cart,removeformCart,updateDeliveryOption} from "../../data/cart.js";
import {products,getProduct} from "../../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.13/esm/index.js';
import { delivery,getDeliveryOption } from "../../data/delivery.js";
import { renderPaymentSummary } from "./payment summary.js";


export function renderOrderSummary(){
    let cartSummaryHtml='';


    cart.forEach((cartItem)=>{
        const productId=cartItem.productId;

    const match= getProduct(productId);
        
    const deliveryOptionId=cartItem.deliveryId;

   const deliveryOption=getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.dDay, 'days');  
    const dateString = deliveryDate.format('dddd, MMMM D');

        cartSummaryHtml+=
        `
        <div class="cart-item-container  js-cart-item-container-${match.id}">
                <div class="delivery-date">
                Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${match.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${match.name}
                    </div>
                    <div class="product-price">
                    ₹${match.priceCents.toFixed(2)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                        Update
                    </span>
                    <span class="delete-quantity-link link-primary  js-delete " data-product-id="${match.id}">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    
                    ${deliveryOptions(match,cartItem)}
                    
                </div>
                </div>
            </div>`;

    });

    function deliveryOptions(match,cartItem) {
        let html = '';
        delivery.forEach((deliveryOption) => { 
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.dDay, 'days');  
            const dateString = deliveryDate.format('dddd, MMMM D');

            const priceString = deliveryOption.priceCents === 0  
                ? 'FREE'
                : `₹${deliveryOption.priceCents}-`;

            const isChecked=deliveryOption.id===  cartItem.deliveryId;       
            html +=
                `<div class="delivery-option js-delivery-option" data-product-id="${match.id}"
                data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio"
                        ${isChecked?'checked':''}
                        class="delivery-option-input"
                        name="delivery-option-${match.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} Shipping
                        </div>
                    </div>
                </div>`;
        });

        return html;
    }



    document.querySelector('.js-order-summary').innerHTML=cartSummaryHtml;


    document.querySelectorAll('.js-delete').forEach((link)=>
    {
        link.addEventListener('click',()=>
        {
            const productId= link.dataset.productId;
            removeformCart(productId);
            const container= document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();


            renderPaymentSummary();
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
        element.addEventListener('click',()=>{
            const {productId,deliveryOptionId}=element.dataset;
            updateDeliveryOption(productId,deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary(); 
        });
    });
}

