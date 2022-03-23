import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
//import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {me} from '../store/auth';
import { fetchProjectGallery } from '../store/projectGallery';

const Gallery = () => {
  const userId = useSelector((state) => {
    return state.auth.id; //name of reducer,value returned is that part of the state
  });

  useEffect(() => {
    const run = async () => {
      const Allprojects = await fetchProjectGallery(userId); //this doesnt exist yet we need to write the store
    };
    run();
  }, [userId]);


  const user = useSelector((state) => {
    return state.auth; //name of reducer,value returned is that part of the state
  });

  const projects = useSelector((state) => {
    return state.projects; //need to write this reducer still
  });

  const dispatch = useDispatch();
  useEffect(
    (userId) => {
      dispatch(fetchProjects(userId)); //still need to be written
      dispatch(deleteProject(userId)); //This can potentially be used in a click handler or something too
    },
    [dispatch]
  );

  return (
    <>
      <div className='gallery_container'></div>
      <div className='gallery'>
        {projects.map((project) => (
          <div className='project' key={project.id}>
            <Link to={`/projects/${project.id}`}>
              <h2 className='title'>{project.title}</h2>
            </Link>
            <img className='thumbnail' src={project.imageUrl} />
            <form>
              <button
                type='submit'
                className='project_delete_btn'
                value={project.id}
                onClick={(event) => deleteproject(event.target.value)}
              >
                Delete project
              </button>
            </form>
          </div>
        ))}
      </div>
    </>
  );
};

export default Gallery;
