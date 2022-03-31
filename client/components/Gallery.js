import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { fetchProjectGallery } from "../store/gallery";
import VideoLooper from 'react-video-looper';

const Gallery = () => {
  const userId = useSelector((state) => {
    return state.auth.id;
  });

  const projects = useSelector((state) => {
    return state.projects; //this reads from the redux store
  });

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (userId) {
      dispatch(fetchProjectGallery());
    }
  }, [dispatch, userId]);

  const refreshVideo = (projectId) => {
    history.push(`/gallery/${projectId}`)
    history.go(0);
  };

  return (
    <div>
      <div className='gallery_container'></div>
      <div className='gallery'>
        {projects.map((project) => (
          <div className='project' key={project.id}>
            <VideoLooper
            clasName ='video-thumbnails'
                source={project.videoUrl}
                start={4.31}
                end={9.48}
                loop
                position={'relative'}
              />
            <Link to={`/gallery/${project.id}`}>
              <button onClick={()=>refreshVideo(project.id)} className='fancyButton'>{project.title}</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
