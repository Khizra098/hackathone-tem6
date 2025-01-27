export interface Product {
    _id : string;
    title: string;
    _type : "product";
    productImage: {
        _type: 'image',
        asset: {
          _ref: string,
        },
    };
    price: number;
    description?: string;
}