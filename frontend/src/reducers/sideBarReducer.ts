import { AsideBarAction, AsideBarState } from "../@types/redux";

export const sideBarReducer = (
  state: AsideBarState = {},
  action: AsideBarAction
): AsideBarState => {
  switch (action.type) {
    case "ASIDE_SHOW_CART":
      return { show: true, content: "CART_VIEW" };
    case "ASIDE_SHOW_WISHLIST":
      return { show: true, content: "WISHLIST_VIEW" };
    case "ASIDE_CLOSE":
      return {};
    default:
      return state;
  }
};
