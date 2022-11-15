import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles.jsx";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

// import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase.utils";
import { currentUserSelector } from "../../store/user/user.selector.js";

const Navigation = () => {
    const currentUser = useSelector(currentUserSelector);
    // const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    // console.log(currentUser);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrwnLogo />
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">SHOP</NavLink>
                    {currentUser ? <NavLink onClick={signOutUser}>SIGN OUT</NavLink> : <NavLink to="/auth">SIGN IN</NavLink>}
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};
export default Navigation;
