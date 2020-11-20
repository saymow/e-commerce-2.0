import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AsideBarState } from "../../../@types/redux";
import {
  closeAsidebar,
  openCart,
  openWishlist,
} from "../../../actions/uiActions";
import { reduxStore } from "../../../store";
import CartSidebarView from "../../cart/CartSidebarView";
import WishlistSidebarView from "../../wishList/WishlistSidebarView";
import ThemeSwitcher from "../ThemeSwitcher";

import {
  Container,
  Wrapper,
  CloseIcon,
  AsideHeader,
  AsideNav,
  AsideNavItem,
  CartIcon,
  WishListIcon,
  Content,
  Options,
} from "./styles";

const SideBar: React.FC = () => {
  const dispatch = useDispatch();
  const asideRef = useRef<HTMLDivElement>(null);
  const [documentRef, setDocumentRef] = useState<HTMLBodyElement | null>(null);

  const SLIDE_DURATION = 300;

  const { show, content } = useSelector<typeof reduxStore>(
    (state) => state.sideBar
  ) as AsideBarState;

  useEffect(() => {
    setDocumentRef(document.querySelector("body"));
  }, []);

  const handleCloseAsideBar = () => {
    asideRef.current?.classList.add("slide-out");
    documentRef!.style.overflow = "unset";
    setTimeout(() => {
      dispatch(closeAsidebar());
    }, SLIDE_DURATION);
  };

  const handleNavToCartView = () => dispatch(openCart());

  const handleNavToCartWishlistView = () => dispatch(openWishlist());

  if (!show) return null;

  documentRef!.style.overflow = "hidden";

  return (
    <Wrapper>
      <Container ref={asideRef} duration={SLIDE_DURATION}>
        <Options>
          <ThemeSwitcher />
        </Options>
        <CloseIcon onClick={handleCloseAsideBar} />
        <AsideHeader>
          <AsideNav>
            <AsideNavItem
              onClick={handleNavToCartView}
              className={content === "CART_VIEW" ? "selected" : ""}
            >
              <h1>My Cart</h1>
              <CartIcon />
            </AsideNavItem>
            <AsideNavItem
              onClick={handleNavToCartWishlistView}
              className={content === "WISHLIST_VIEW" ? "selected" : ""}
            >
              <h1>Wish list</h1>
              <WishListIcon />
            </AsideNavItem>
          </AsideNav>
        </AsideHeader>
        <Content>
          {content === "WISHLIST_VIEW" ? (
            <WishlistSidebarView />
          ) : (
            <CartSidebarView />
          )}
        </Content>
      </Container>
    </Wrapper>
  );
};

export default SideBar;
