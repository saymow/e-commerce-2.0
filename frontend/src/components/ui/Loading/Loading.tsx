import React from "react";
import DisappearedLoading from "react-loadingg/lib/DisappearedLoading";

interface Props {
  embedded?: boolean;
  variant?: "small" | "large";
}

const Loading: React.FC<Props> = ({ variant = "large", embedded = false }) => {
  return (
    <DisappearedLoading
      color="var(--light-Grey)"
      size={variant}
      style={embedded ? { height: "100%" } : undefined} // Adapt to component height
    />
  );
};

export default Loading;
