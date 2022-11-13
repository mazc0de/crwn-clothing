import { useContext } from "react";

import CategoryPreview from "../../components/category-preview/category-preview.component";

import { CategoriesContext } from "../../contexts/categories.context";

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);

    return (
        <div className="shop-container">
            {Object.keys(categoriesMap).map((category) => {
                // console.log(category); // string category hats, jackets, mens,sneakers, womens
                // categoriesMap = berisi object category yang didalamnya ada array product berdasarkan category
                const products = categoriesMap[category]; // isi product berdasarkan category
                return <CategoryPreview key={category} title={category} products={products} />;
            })}
        </div>
    );
};

export default CategoriesPreview;
