// import { useContext } from "react";
import { useSelector } from "react-redux";

import CategoryPreview from "../../components/category-preview/category-preview.component";

import { categoriesMapSelector } from "../../store/categories/categories.selector";

// import { CategoriesContext } from "../../contexts/categories.context";

const CategoriesPreview = () => {
    // move to redux
    // const { categoriesMap } = useContext(CategoriesContext);

    const categoriesMap = useSelector(categoriesMapSelector);

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
