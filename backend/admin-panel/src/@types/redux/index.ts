export type DefaultState<T> = {
  loading?: boolean;
  success?: boolean;
  error?: {
    message: string;
  };
  reset?: () => { type: string };
} & T;

export type Dispatch<T> = (arg0: T) => void;
