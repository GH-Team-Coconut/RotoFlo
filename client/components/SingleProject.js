import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProject } from "../store/singleProject"; //write this
import { deleteProject } from "../store/gallery";
import { Link } from "react-router-dom";

const SingleProject = () => {
  const project = useSelector((state) => {
    return state.project; //this reads from the redux store so make a separate project key from that sub reducer aight
  });

  const projectId = useSelector((state) => {
    // console.log(state);
    return state.project.id;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProject(projectId));
      dispatch(deleteProject(projectId));
    }
  }, [dispatch, projectId]);

  return (
    <>
      <div className='single-project'>
        <br />
        <div className='project-info'>
          {/* <div id="single-project-img">
                        <img src={project.imageUrl} />
                    </div>  ==========> change this shiz to video once we get it to play back on demand*/}
          <div id='project_title'>
            <h1>{project.title}</h1>
          </div>
          <button
            type='submit'
            className='project_delete_btn'
            value={project.id}
            onClick={(event) => deleteProject(event.target.value)}
          >
            Delete project
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleProject;
