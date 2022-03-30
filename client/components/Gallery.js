import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProjectGallery } from "../store/gallery";

const Gallery = () => {
  const userId = useSelector((state) => {
    return state.auth.id;
  });

  const projects = useSelector((state) => {
    return state.projects; //this reads from the redux store
  });
//console.log('*********** project in Gallery', projects)

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchProjectGallery());
    }
  }, [dispatch, userId]);

  return (
    <div>
      <div className='gallery_container'></div>
      <div className='gallery'>
        {projects.map((project) => (
          <div className='project' key={project.id}>
            <Link to={`/gallery/${project.id}`}>
              <button>{project.title}</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
