import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProject } from '../store/singleProject'; //write this
import { deleteProject } from '../store/gallery';
import { useParams, useHistory } from 'react-router-dom';
import VideoLooper from 'react-video-looper';

const SingleProject = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [video, setVideo] = useState({});

  const project = useSelector((state) => {
    return state.project || {}; //this reads from the redux store so make a separate project key from that sub reducer aight
  });

  const { projectId } = useParams();
  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    if (projectId) {
      dispatch(fetchProject(projectId));
    }
  }, [dispatch, projectId]);

  useEffect(() => {
    if (project) {
      setVideo(project.video);
      console.log(video);
    }
  }, [project]);

  useEffect(() => {
    if (video) {
      setVideoUrl(video.videoUrl);
    }
  }, [video]);


  const deleteAndReturn = (event) => {
    dispatch(deleteProject(event.target.value));
    history.push('/gallery');
    //window.location.reload()
    //window.location.replace('http://localhost:8080/gallery');
    history.go(0);
  };

  return (
    <>
      <div className='single-project'>
        <br />
        <div className='project-info'>
          <div className='singleProject' id='single-project-video'>
            {videoUrl ? (
              <VideoLooper
                source={videoUrl}
                start={4.31}
                end={9.48}
                loop
                position={'relative'}
              />
            ) : (
              ''
            )}
            <div id='project_title'>
              <h1 className='header'>{project.title}</h1>
            </div>
          </div>
          <div>
            <button
              type='submit'
              className='fancyButton'
              value={project.id}
              onClick={deleteAndReturn}
            >
              DELETE
            </button>
            <button
              type='submit'
              className='fancyButton'
              value={project.id}
              //onClick={(event) => downloadProject(event.target.value)}
            >
              DOWNLOAD
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProject;
