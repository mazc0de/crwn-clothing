import { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { CategoriesContext } from "../../contexts/categories.context";

import ProductCard from "../../components/product-card/product-card.component";

import "./category.style.scss";
import { categoriesMapSelector } from "../../store/categories/categories.selector";

const Category = () => {
    const categoriesMap = useSelector(categoriesMapSelector);

    const { category } = useParams();
    // const { categoriesMap } = useContext(CategoriesContext);

    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            <h2 className="category-title">{category.toUpperCase()}</h2>

            <div className="category-container">
                {products &&
                    products.map((product) => {
                        return <ProductCard key={product.id} product={product} />;
                    })}
            </div>
        </>
    );
};

export default Category;
