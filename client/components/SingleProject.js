import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProject } from "../store/singleProject";
import { deleteProject } from "../store/gallery";
import { useParams, useHistory, Link } from "react-router-dom";
import VideoLooper from "react-video-looper";

const SingleProject = () => {
  const [videoUrl, setVideoUrl] = useState("");

  const history = useHistory();

  const project = useSelector((state) => {
    return state.project || {};
  });

  const { projectId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProject(projectId));
    }
  }, [dispatch, projectId]);

  useEffect(() => {
    if (project) {
      setVideoUrl(project.videoUrl);
    }
  }, [project]);

  const deleteAndReturn = (event) => {
    dispatch(deleteProject(event.target.value));
    history.push("/gallery");
    //Other option for forcing a reload, seemed equally time efficient:
    //window.location.reload()
    history.go(0);
  };

  const download = () => {
    console.log(videoUrl);
    return <a href={videoUrl}> Hyper link </a>;
  };

  return (
    <>
      <div className='single-project'>
        <br />
        <Link className='fancyButton' to='/gallery'>
          GALLERY
        </Link>
        <div className='project-info'>
          <div className='singleProject' id='single-project-video'>
            {videoUrl ? (
              <VideoLooper
                source={videoUrl}
                start={4.31}
                end={9.48}
                loop
                position={"relative"}
              />
            ) : (
              ""
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
              onClick={download}
            >
              <a href={videoUrl}> DOWNLOAD </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProject;
