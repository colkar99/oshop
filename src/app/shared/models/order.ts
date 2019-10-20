export class Order{
    dateOrder: number;
    items: any;
    constructor(public userId: string,public shipping: any, shoppingCart: any){
        this.dateOrder = new Date().getTime()
        this.items = shoppingCart.items.map(x =>{
            return {
              product: {
                imageUrl: x.imageUrl,
              title: x.title,
              price: x.price
              },
              quantity: x.quantity,
              totalPrice: x.totalPrice
            }
          })
    }
}