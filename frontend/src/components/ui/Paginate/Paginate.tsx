import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShopPaginationState } from "../../../@types/redux";
import { shopPaginate } from "../../../actions/uiActions";
import { reduxStore } from "../../../store";

import { Container, BackArrow, ForwardArrow, PaginateButton } from "./styles";

const Paginate: React.FC<{ pages: number }> = ({ pages }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [arrowsNavDisp, setArrowsNavDisp] = useState({
    back: false,
    forward: true,
  });

  const { currentPage } = useSelector<typeof reduxStore>(
    (state) => state.shopPagination
  ) as ShopPaginationState;

  const routePaginate = (page: number) => {
    router.push(`?page=${page}`, undefined, { shallow: true });
  };

  useEffect(() => {
    const page = router.query.page as string;

    if (!page) return;

    dispatch(shopPaginate(router.query.page as string));
    setArrowsNavDisp({
      back: parseInt(page) !== 1,
      forward: parseInt(page) !== pages,
    });
  }, [router.query.page]);

  return (
    <Container>
      <BackArrow
        onClick={() =>
          arrowsNavDisp.back && routePaginate((currentPage as number) - 1)
        }
        className={!arrowsNavDisp.back ? "disabled" : ""}
      />
      {[...Array(pages)].map((_, i) => (
        <PaginateButton
          key={i}
          onClick={() => routePaginate(i + 1)}
          className={i + 1 === currentPage ? "active" : "none"}
        >
          {i + 1}
        </PaginateButton>
      ))}
      <ForwardArrow
        onClick={() =>
          arrowsNavDisp.forward && routePaginate((currentPage as number) + 1)
        }
        className={!arrowsNavDisp.forward ? "disabled" : ""}
      />
    </Container>
  );
};

export default Paginate;
