 "use client"
// import React, { useEffect, useState } from "react";
// import sanityClient from "@sanity/client";
// import Image from "next/image";
// import {client} from "@sanity/lib/client";

// const sanity = sanityClient({
//   projectId: "0rw5oabb",
//   dataset: "production",
//   apiVersion: "2025-01-13",
//   useCdn: true,
// });

// interface Product {
//   _id: string;
//   title: string;
//   price: number;
//   description: string;
//   dicountPercentage: number;
//   imageUrl: string;
//   productImage: {
//     assest: {
//       _ref: string;
//       _type: image;
//     };
//   };
//   tags: string[];
// }

// const ProductCards: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [card, setCard] = useState<Product[]>([]);

//   const fetchProducts = async () => {
//     try {
//       const query = `
//             *[type == "product"] {
//             _id,
//             title,
//             price, 
//             discription,
//             disountPercentage,
//             // "imageUrl": productImage.assest->url,
//             productImage,
//             tags
//              }
//             `;

//       const data = await sanity.fetch(query);
//       setProducts(data);
//     } catch (error) {
//       console.error("Error Fetching products:", error);
//     }
//   };

//   const addToCard = (product: Product) => {
//     setCard((prevCart) => [...prevCart, product]);
//     alert(`${product.title} has been added to your cart!`);
//   };
 
//   const truncateDescription = (description:string) => {
//     return description.length > 100 ? description.substring(0, 100) + "..." : description;
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);


//   return (
//     <div className="p-4">
//       <h2 className="text-center text-slate-800 mt-4 mb-4">
//         {/* {" "} */}
//         Products From API's Data
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <div
//             key={product._id}
//             className="bg-white shadow-md rounded-l gap-4 hover:shadow-lg transition-shadow duration-300"
//           >
//             <Image
//               src={product.imageUrl}
//               alt={product.title}
//               width={300}
//               height={300}
//               className="w-full h-48 object-cover rounded-md"
//             />

//             <div className="mt-4">
//               <h2 className="text-lg font-semibold">{product.title}</h2>
//               <p className="text-slate-800 mt-2 text-sm">
//                 {truncateDescription(product.description)}
//               </p>
//               <div className="flex justify-between items-center mt-4">
//                 <div>
//                   <p className="text-slate-600 font-bold"> ${product.price}</p>
//                   {product.dicountPercentage > 0 && (
//                     <p className="text-sm text-gray-600">
//                       {product.dicountPercentage}% OFF
//                     </p>
//                   )}
//                 </div>
//               </div>
//               <div className="mt-2 flex flex-wrap gap-2">
//                 {product.tags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="text-xs bg-slate-400 text-black px-2 py-1"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//               {/* /* Add to cart functionality */}

//               <button
//                 className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//                 onClick={() => addToCard(product)}
//               >
//                 Add To Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       {/* cart Summary */}
//       <div className=" mt-8 bg-slate-100 p-6 rounded-lg shadow-md">
//         <h2 className="text-lg font-black text-red-800">Cart Summary</h2>
//         {card.length > 0 ? (
//           <ul className="space-y-4">
//             {card.map((item, index) => (
//               <li
//                 key={index}
//                 className="flex justify-between items-center bg-white shadow-sm p-4 rounded-md"
//               >
//                 <div>
//                   <p className="font-medium text-slate-900">{item.title}</p>
//                   <p className="text-sm text-blue-600">
//                     ${item.price.toFixed(2)}
//                   </p>
//                 </div>

//                 <Image
//                   src={item.imageUrl}
//                   alt={item.title}
//                   width={50}
//                   height={50}
//                   className="rounded-md"
//                 />
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-black text-center">
//             Your Cart Is Empty Please Add Products
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };
// export default ProductCards;
// ,,,,,,,,,

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Product } from "../../../types/products";
import { client } from "@/sanity/lib/client";
import { allProducts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts: Product[] = await client.fetch(allProducts);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Our Latest Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200"
          >
            {product.productImage && (
              <Image
                src={urlFor(product.productImage).url()}
                alt={product.title || "Product image"}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-md"
              />
            )}
            <h2 className="text-lg font-semibold mt-4">{product.title}</h2>
            <p className="text-gray-500 mt-2">
              {product.price ? `$${product.price}` : "Price not available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
