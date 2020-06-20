const HelperService = {
	limitDescription(description, limit = 50) {
		const newDescription = [];
		if (description.length > limit) {
			description.split(' ').reduce((acc, cur) => {
				if (acc + cur.length <= limit) {
					newDescription.push(cur);
				}
				return acc + cur.length;
			}, 0);

			// return the result
			return `${newDescription.join(' ')} ...`;
		}
		return description;
	},
};

export default HelperService;
