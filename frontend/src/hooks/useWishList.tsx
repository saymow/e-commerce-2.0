import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "../@types";
import { WishListState } from "../@types/redux";
import {
  addProductToWishList,
  removeProductFromWishList,
} from "../actions/wishListActions";
import { reduxStore } from "../store";

export default function useWishList(
  product: IProduct
): [boolean, () => void, () => void] {
  const dispatch = useDispatch();

  const [isWishListed, setIsWishListed] = useState(false);

  const { products } = useSelector<typeof reduxStore>(
    (state) => state.wishList
  ) as WishListState;

  useEffect(() => {
    const isOnWishList = products.find(
      (_product) => _product.id === product.id
    );
    setIsWishListed(Boolean(isOnWishList));
  }, [products]);

  const handleAddToWishlist = () => {
    dispatch(addProductToWishList(product));
  };

  const handleDeleteFromWishlist = () => {
    dispatch(removeProductFromWishList(product.id));
  };

  return [isWishListed, handleAddToWishlist, handleDeleteFromWishlist];
}
