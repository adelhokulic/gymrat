export const getWeekStart = (): string => {
	const today = new Date();
	today.setDate(today.getDate() - ((today.getDay() + 6) % 7));
	return `${String(today.getFullYear())}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
};
