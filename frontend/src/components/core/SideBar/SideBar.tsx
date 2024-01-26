import React, { useCallback, useEffect, useRef, useState } from "react";
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
  AsideHeader,
  AsideNav,
  AsideNavItem,
  Backdrop,
  CartIcon,
  CloseIcon,
  Container,
  Content,
  Options,
  WishListIcon,
  Wrapper,
} from "./styles";
import UserInfo from "./UserInfo";

const SLIDE_DURATION = 300;

const SideBar: React.FC = () => {
  const dispatch = useDispatch();
  const asideRef = useRef<HTMLDivElement>(null);
  const [documentRef, setDocumentRef] = useState<HTMLBodyElement | null>(null);

  const { show, content } = useSelector<typeof reduxStore>(
    (state) => state.sideBar
  ) as AsideBarState;

  const handleCloseAsideBar = useCallback(
    (options?: { force: boolean }) => {
      const delay = options?.force ? 0 : SLIDE_DURATION;

      asideRef.current?.classList.add("slide-out");
      if (documentRef) documentRef.style.overflow = "unset";
      const timeoutId = setTimeout(() => {
        dispatch(closeAsidebar());
      }, delay);

      return () => {
        clearTimeout(timeoutId);
      };
    },
    [documentRef]
  );

  useEffect(() => {
    setDocumentRef(document.querySelector("body"));
  }, []);

  useEffect(() => {
    handleCloseAsideBar({ force: true });
  }, []);

  const handleNavToCartView = () => dispatch(openCart());

  const handleNavToCartWishlistView = () => dispatch(openWishlist());

  if (!show) return null;

  if (documentRef) documentRef.style.overflow = "hidden";

  return (
    <Wrapper>
      <Backdrop onClick={() => handleCloseAsideBar()} />
      <Container ref={asideRef} duration={SLIDE_DURATION}>
        <Options>
          <ThemeSwitcher />
          <UserInfo />
        </Options>
        <CloseIcon onClick={() => handleCloseAsideBar()} />
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
