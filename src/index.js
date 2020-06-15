import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { UsersProvider } from './context/UsersContext';
import { ProjectsProvider } from './context/ProjectsContext';
import { SectionsProvider } from './context/SectionsContext';
import { TaskProvider } from './context/TaskContext';

import App from './App';

import './css/style.css';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<UsersProvider>
				<ProjectsProvider>
					<SectionsProvider>
						<TaskProvider>
							<App />
						</TaskProvider>
					</SectionsProvider>
				</ProjectsProvider>
			</UsersProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
