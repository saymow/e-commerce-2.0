import { FC, useEffect } from "react";
import Router from "next/router";
import useSession from "../../hooks/useSession";

const fallbacks = {
  public: "/profile",
  private: "/signin",
};

interface Props {
  type: "public" | "private";
}

export const WithRestriction: React.FC<Props> = ({ children, type }) => {
  const [user, loading] = useSession();

  useEffect(() => {
    if (loading) return;
    else if (type === "public" && user) Router.replace(fallbacks[type]);
    else if (type === "private" && !user) Router.replace(fallbacks[type]);
  }, [loading]);

  return <>{children}</>;
};
