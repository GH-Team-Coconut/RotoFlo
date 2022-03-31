import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProject } from '../store/singleProject';
import { deleteProject } from '../store/gallery';
import { useParams } from 'react-router-dom';
import VideoLooper from 'react-video-looper';

const SingleProject = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [video, setVideo] = useState({});

  const project = useSelector((state) => {
    return state.project || {};
  });

  const { projectId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProject(projectId));
      //dispatch(deleteProject(projectId));
    }
  }, [dispatch, projectId]);

  useEffect(() => {
    if (project) {
      setVideo(project.video);
    }
  }, [project, project.id]);

  useEffect(() => {
    if (video) {
      setVideoUrl(video.videoUrl);
      console.log('VIDEO URL', video.videoUrl);
    }
  }, [projectId, video]);

  return (
    <>
      <div className='single-project'>
        <br />
        <div className='project-info'>
          <div id='single-project-video'>
            {video ? (
              <VideoLooper source={videoUrl} start={4.31} end={9.48} loop />
            ) : (
              ''
            )}
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
