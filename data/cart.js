export let cart=JSON.parse(localStorage.getItem('cart'));




if(!cart){
    cart=[{
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 
        quantity:2,
        deliveryId:'1',
     },{
         productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
         quantity:1,
         deliveryId:'2'
         
     }];
}



function saveTo(){
    localStorage.setItem('cart',JSON.stringify(cart));
}


export function  addtocart(productId){
    let match;
    cart.forEach((cartItem)=>{
        if(productId===cartItem.productId)
        match=cartItem;
        });
        if(match){
        match.quantity++;
        }else{
    cart.push({
    productId:productId,
    quantity:1,
    deliveryId:'1'
});
}

saveTo();
}

export function removeformCart(productId){
    const newCart=[];

    cart.forEach((cartItem)=>{
        if(cartItem.productId!==productId){
            newCart.push(cartItem);
        }
    });

    cart=newCart;

    saveTo();
}

export function updateDeliveryOption(productId,deliveryOptionId){
    let match;
    cart.forEach((cartItem)=>{
        if(productId===cartItem.productId)
        match=cartItem;
        });

    
    match.deliveryId=deliveryOptionId;

    saveTo();
}