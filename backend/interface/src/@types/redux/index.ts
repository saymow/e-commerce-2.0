export type DefaultState<t> = {
  loading?: boolean;
  error?: {
    message: string;
  };
} & t;

export type Dispatch<t> = (arg0: t) => void;
