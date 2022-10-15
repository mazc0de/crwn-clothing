import { useContext } from "react";

import { ProductContext } from "../../contexts/product.context.js";

import ProductCard from "../../components/product-card/product-card.component.jsx";

import "./shop.style.scss";

const Shop = () => {
    const { products } = useContext(ProductContext);

    return (
        <>
            <div className="product-container">
                {products.map((product) => {
                    return <ProductCard key={product.id} product={product} />;
                })}
            </div>
        </>
    );
};

export default Shop;
