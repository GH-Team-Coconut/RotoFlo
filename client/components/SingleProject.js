import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProject } from '../store/singleProject'; //write this
import { deleteProject } from '../store/gallery';
import { Link, useParams } from 'react-router-dom';

const SingleProject = () => {
  const project = useSelector((state) => {
    return state.project; //this reads from the redux store so make a separate project key from that sub reducer aight
  });

  const { projectId } = useParams(); //what sorcery is this

  const dispatch = useDispatch();

  useEffect(() => {
    if (projectId) {
      //console.log(projectId)
      dispatch(fetchProject(projectId));
      //dispatch(deleteProject(projectId));
    }
  }, [dispatch, projectId]);

  const projectKeys = Object.keys(project);
  const projectValues = Object.values(project);

  console.log('Project keys', projectKeys);
  console.log('Project values', projectValues);
  console.log('Project.video', project.video); //cannot for the life of me get a value after this it has to be simple
  //console.log('Project.video.videoUrl', project.)

  return (
    <>
      <div className='single-project'>
        <br />
        <div className='project-info'>
          <div id='single-project-video'>
            {/* <video src={project.video.videoUrl} loop /> */}
          </div>
          <div id='project_title'>
            <h1>{project.title}</h1>
          </div>
          <button
            type='submit'
            className='project_delete_btn'
            value={project.id}
            onClick={(event) => dispatch(deleteProject(event.target.value))}
          >
            Delete project
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleProject;
