import React from "react";

import { Container, FullStar, HalfStar, EmptyStar } from "./styles";

const Rating: React.FC<{ value: number }> = ({ value }) => {
  const getStar = (value: number, due: number) =>
    value >= due ? (
      <FullStar key={due} />
    ) : value >= due - 0.5 ? (
      <HalfStar key={due} />
    ) : (
      <EmptyStar key={due} />
    );

  return (
    <Container>{[...Array(5)].map((_, i) => getStar(value, i + 1))}</Container>
  );
};

export default Rating;
