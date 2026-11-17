export const loadFromStorage = <T>(key: string, fallback: T): T => {
	const values = localStorage.getItem(key);
	try {
		if (values) {
			return JSON.parse(values);
		} else return fallback;
	} catch (error) {
		return fallback;
	}
};

export const saveToStorage = <T>(key: string, value: T): void => {
	localStorage.setItem(key, JSON.stringify(value));
};
