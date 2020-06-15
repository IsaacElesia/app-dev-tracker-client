import React, { Component } from 'react';

const ProjectsContext = React.createContext({
	projects: [],
	project: {},
});
export default ProjectsContext;

export class ProjectsProvider extends Component {
	state = {
		projects: [],
		project: {},
	};

	setProjects = (projects) => {
		this.setState({ projects });
	};

	setProject = (project) => {
		this.setState({ project });
	};

	render() {
		const value = {
			projects: this.state.projects,
			project: this.state.project,
			setProjects: this.setProjects,
			setProject: this.setProject,
		};
		return (
			<ProjectsContext.Provider value={value}>
				{this.props.children}
			</ProjectsContext.Provider>
		);
	}
}
