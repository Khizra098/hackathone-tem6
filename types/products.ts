export interface Product {
    _id : string;
    title: string;
    _type : "product";
    productImage: {
        _type: 'image',
        asset: {
          _ref: imageId,
        },
    };
    price: number;
    description?: string;
}