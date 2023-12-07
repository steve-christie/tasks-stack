export const REQUEST = "REQUEST";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";

export interface IAction<T> {
  type: string;
  payload: T | undefined;
}

export const createRequestTypes = (
  prefix: string
): { [id: string]: string } => {
  if (!prefix) {
    throw new Error("You must provide a valid prefix");
  }

  return {
    REQUEST: `${prefix}_REQUEST`,
    SUCCESS: `${prefix}_SUCCESS`,
    FAILURE: `${prefix}_FAILURE`,
  };
};

export const action = <T extends object | string | boolean>(
  type: string,
  payload?: T
): IAction<T> => {
  if (!type) {
    throw new Error("You must provide a valid action type");
  }

  return { type, payload };
};
