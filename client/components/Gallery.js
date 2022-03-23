import { useEffect, useSelector, useDispatch } from 'react';
//import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import our fetch thunks from the store based on the scheemas to retrieve users projects (fetchProjects())

const Gallery = () => {
  useEffect(() => {
    const run = async () => {
      const Allprojects = await fetchProjects(); //this doesnt exist yet we need to write the store
    };
    run();
  }, []);

  const user = useSelector((state) => {
    return state.user;
  });
  const projects = useSelector((state) => {
    return state.projects;
  });

  const dispatch = useDispatch();

  useEffect((id) => {
    dispatch(fetchProjects())
    dispatch(deleteProject(id)) //I think this is wrong but I'm not sure
  }, [dispatch])

  //this is how I would write the regular dispatch I need to research the hook more
  // const mapDispatchToProps = (dispatch, { history }) => ({
  //   loadProjects: () => dispatch(fetchProjects()),
  //   deleteProject: (id) => dispatch(deleteproject(id, history)),
  // });

  //figure out how to check if its the correct user reference grace shopper
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
                onClick={(event) =>
                  deleteproject(event.target.value)
                }
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
