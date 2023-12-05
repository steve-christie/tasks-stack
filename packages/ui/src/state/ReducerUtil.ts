export const REQUEST = "REQUEST";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";

export interface IAction<T> {
	type: string;
	payload: T;
}

export const createRequestTypes = (prefix: string): { [id: string]: string } => {
	if (!prefix) {
		throw new Error("You must provide a valid prefix");
	}

	return {
		RESET: `${prefix}_RESET`,
		REQUEST: `${prefix}_REQUEST`,
		SUCCESS: `${prefix}_SUCCESS`
	};
};

export const action = <T extends object | string | boolean>(type: string, payload: T): IAction<T> => {
	if (!type) {
		throw new Error("You must provide a valid action type");
	}

	if (payload === undefined) {
		throw new Error("You must provide a valid action payload");
	}

	return { type, payload };
};
