import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjectGallery, _deleteProject } from '../store/gallery';

const Gallery = () => {

  const userId = useSelector((state) => {
    return state.auth.id;//name of reducer,value returned is that part of the state
  });

  const projects = useSelector((state) => {
    return state.projects; //this reads from the redux store
  });

  // const projectId = useSelector((state) => {
  //   return state.project.id;
  // });

  const dispatch = useDispatch();

  useEffect(
    () => {
      if(userId){
        dispatch(fetchProjectGallery());
         //This can potentially be used in a click handler or something too
      }
    },
    [dispatch, userId]
  );

  // useEffect(
  //   () => {
  //     if(projectId){
  //       dispatch(_deleteProject(projectId));
  //     }
  //   },
  //   [dispatch, userId, projectId]
  // );

  return (
    <div>
      <div className='gallery_container'></div>
      <div className='gallery'>
        {projects.map((project) => (
          <div className='project' key={project.id}>
            <Link to={`/projects/${project.id}`}>
              <h2 className='title'>{project.title}</h2>
            </Link>
            {/* <img className='thumbnail' src={project.imageUrl} /> */}
              <button
                type='submit'
                className='project_delete_btn'
                value={project.id}
                onClick={(event) => _deleteProject(event.target.value)}
              >
                Delete project
              </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

//I added the option to delete a project from the gallery too but if thats too redundant or cluttered its in the single project view. Now that I think about it if wee dont do thumbnails too then it would be cleaner to just have a list of titles and the delete option in the single view but lemme know.