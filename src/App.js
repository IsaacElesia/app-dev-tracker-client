import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PublicRoute from './utils/PublicRoute';
import PrivateRoute from './utils/PrivateRout';

import Login from './componets/auth/Login';
import LaningPage from './componets/pages/LandingPage';
import Dashboard from './componets/pages/Dashboard';
import FindUser from './componets/users/FindUser';
import CreateUser from './componets/users/CreateUser';
import CreateProject from './componets/projects/createProject/CreateProject';
import ProjectDetails from './componets/projects/projectDetails/ProjectDetails';
import SectionDetails from './componets/sections/sectionDetails/SectionDetails';
import CreateSection from './componets/sections/createSection/CreateSection';
import CreateTask from './componets/tasks/createTask/CreateTask';
import TaskDetails from './componets/tasks/taskDetails/TaskDetails';

export class App extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact path='/' component={LaningPage} />
					<PublicRoute exact path='/login' component={Login} />
					<PrivateRoute exact path='/dashboard' component={Dashboard} />
					<PrivateRoute path='/users' component={FindUser} />
					<PublicRoute path='/user/createuser' component={CreateUser} />
					<PrivateRoute
						path='/projects/createproject'
						component={CreateProject}
					/>
					<PrivateRoute
						path='/projects/:projectId'
						component={ProjectDetails}
					/>
					<PrivateRoute
						path='/newsection/:projectId'
						component={CreateSection}
					/>
					<PrivateRoute
						path='/sections/:sectionId'
						component={SectionDetails}
					/>
					<PrivateRoute path='/newtask/:sectionId' component={CreateTask} />
					<PrivateRoute path='/tasks/:taskId' component={TaskDetails} />
				</Switch>
			</div>
		);
	}
}

export default App;
