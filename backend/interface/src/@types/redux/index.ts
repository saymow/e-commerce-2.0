export type DefaultState<t> = {
  loading?: boolean;
  success?: boolean;
  error?: {
    message: string;
  };
  reset?: () => { type: string };
} & t;

export type Dispatch<t> = (arg0: t) => void;
