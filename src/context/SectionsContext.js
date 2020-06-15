import React, { Component } from 'react';

const SectionsContext = React.createContext({
	sections: [],
	section: {},
});
export default SectionsContext;

export class SectionsProvider extends Component {
	state = {
		sections: [],
		section: {},
	};

	setSections = (sections) => {
		this.setState({ sections });
	};

	setSection = (section) => {
		this.setState({ section });
	};

	render() {
		const value = {
			sections: this.state.sections,
			setSections: this.setSections,
			section: this.state.section,
			setSection: this.setSection,
		};
		return (
			<SectionsContext.Provider value={value}>
				{this.props.children}
			</SectionsContext.Provider>
		);
	}
}
