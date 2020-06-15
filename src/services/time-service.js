import moment from 'moment';

const TimeService = {
	formatDate(date) {
		const m = moment(date).format('ddd MMM DD YYYY');
		return m;
	},

	dueTime(dueDate) {
		const due = moment(dueDate);
		const now = moment();
		const m = due.diff(now, 'days', true);

		return m <= 0
			? { class: 'past-due', status: 'past due' }
			: m <= 3
			? { class: 'runing-late', status: 'late' }
			: { class: 'on-time', status: 'on time' };
	},
};

export default TimeService;
