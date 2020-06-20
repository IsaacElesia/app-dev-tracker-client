import React, { Component } from 'react';

const SectionsContext = React.createContext({
	sections: [],
	section: {},
	filterdSections: 'all',
});
export default SectionsContext;

export class SectionsProvider extends Component {
	state = {
		sections: [],
		section: {},
		filterdSections: 'all',
	};

	setSections = (sections) => {
		this.setState({ sections });
	};

	setSection = (section) => {
		this.setState({ section });
	};
	setFilterdSections = (filterdSections) => {
		this.setState({ filterdSections });
	};

	render() {
		const value = {
			sections: this.state.sections,
			filterdSections: this.state.filterdSections,
			setSections: this.setSections,
			section: this.state.section,
			setSection: this.setSection,

			setFilterdSections: this.setFilterdSections,
		};
		return (
			<SectionsContext.Provider value={value}>
				{this.props.children}
			</SectionsContext.Provider>
		);
	}
}
