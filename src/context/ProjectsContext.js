import React, { Component } from 'react';

const ProjectsContext = React.createContext({
	projects: [],
	project: {},
	filterdProjects: 'all',
});
export default ProjectsContext;

export class ProjectsProvider extends Component {
	state = {
		projects: [],
		project: {},
		filterdProjects: 'all',
	};

	setProjects = (projects) => {
		this.setState({ projects });
	};

	setProject = (project) => {
		this.setState({ project });
	};

	setFilterdProjects = (filterdProjects) => {
		this.setState({ filterdProjects });
	};

	render() {
		const value = {
			projects: this.state.projects,
			project: this.state.project,
			filterdProjects: this.state.filterdProjects,
			setProjects: this.setProjects,
			setProject: this.setProject,
			setFilterdProjects: this.setFilterdProjects,
		};
		return (
			<ProjectsContext.Provider value={value}>
				{this.props.children}
			</ProjectsContext.Provider>
		);
	}
}
