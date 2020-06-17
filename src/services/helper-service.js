const HelperService = {
	completedItems(itemsIn) {
		const items = [];
		itemsIn.forEach((item) => {
			if (item.completed) {
				items.push(item);
			}
		});
		return items;
	},

	inprogressItems(itemsIn) {
		const items = [];
		itemsIn.forEach((item) => {
			if (!item.completed) {
				items.push(item);
			}
		});
		return items;
	},
};

export default HelperService;
