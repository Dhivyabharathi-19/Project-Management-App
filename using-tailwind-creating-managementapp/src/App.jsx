import { useState } from 'react';
import ProjectSidebar from './components/ProjectSidebar';
import NewProject from './components/NewProject';
import NoComponentselected from './components/NoComponentselected';
import SelectedProject from './components/SelectedProject';
import './App.css';

function App() {
  const [projectsState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks:[]
  });
  function handleAddTask(text){
    setProjectState((prevState) => {
      const taskId = Math.random();
      const newtask = {
       text: text,
        ProjectId: prevState.selectedProjectId,
        id: taskId,
      };
      return {
        ...prevState,
        
        tasks:[newtask,...prevState.tasks]
      };
    });
  }
  function handleDeleteTask(id){
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
     tasks: prevState.tasks.filter((task) => task.id !== id),


    }));
  }


  function handleSelectProject(id) {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: id,
    }));
  }

  function handleStartAddProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: null,
    }));
  }

  function handleCancelAddProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
    }));
  }

  function handleAddProject(projectData) {
    setProjectState((prevState) => {
      const ProjectId = Math.random();
      const newProject = {
        ...projectData,
        id: ProjectId,
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter(
        (project) => project.id !== prevState.selectedProjectId
      ),
    }));
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = <SelectedProject 
           project={selectedProject} 
           onDelete={handleDeleteProject} 
           onAddTask={handleAddTask} 
           onDeleteTask={handleDeleteTask}
           tasks={projectsState.tasks}
           />;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoComponentselected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
