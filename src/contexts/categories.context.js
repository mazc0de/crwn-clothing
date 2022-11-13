import { createContext, useState, useEffect } from "react";

// add SHOP_DATA to firestore
// import { addCollectionAndDocuments } from "../utils/firebase.utils";
import { getCategoriesAndDocuments } from "../utils/firebase.utils";
// import SHOP_DATA from "../shop-data.js";

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = { categoriesMap };

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
            // console.log(categoriesMap);
        };

        getCategoriesMap();
    }, []);

    // add SHOP_DATA to firestore
    // useEffect(() => {
    //     addCollectionAndDocuments("categories", SHOP_DATA);
    // }, []);

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};
