export const delivery=[{
    id:'1',
    dDay:7,
    priceCents:0
},
    {
        id:'2',
        dDay:3,
        priceCents:599
    },{
        id:'3',
        dDay:1,
        priceCents:899 
    }
];

export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;

    delivery.forEach((option)=>{
        if(option.id===deliveryOptionId){
            deliveryOption=option;
        }
    });
        return deliveryOption || delivery[0];
};
