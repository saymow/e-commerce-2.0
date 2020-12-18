import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CartState } from "../../../../@types/redux";
import { reduxStore } from "../../../../store";

const useLockedCartDimensions = () => {
  const productListRef = useRef(
    null
  ) as React.MutableRefObject<HTMLDivElement | null>;

  const [productListDimension, setProductDimension] = useState({
    height: 0,
    scrollTop: 0,
  });

  const { locked } = useSelector<typeof reduxStore>(
    (state) => state.cart
  ) as CartState;

  useEffect(() => {
    if (!locked || productListRef.current === null) return;

    const getDimension = () => {
      const height = productListRef.current!.scrollHeight;
      const scrollTop = productListRef.current!.scrollTop;
      setProductDimension({ height, scrollTop });
    };

    productListRef.current?.addEventListener("scroll", getDimension);
    getDimension();

    return () => {
      productListRef.current?.removeEventListener("scroll", getDimension);
    };
  }, [locked, productListRef.current]);

  return [productListRef, locked, productListDimension] as [
    any,
    boolean,
    { height: number; scrollTop: number }
  ];
};

export default useLockedCartDimensions;
