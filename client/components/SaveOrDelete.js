//this lil dude will pop up when we hit stop capture
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProject, saveAndDownload } from '../store/projectGallery';

const SaveOrDelete = () => {
  const projectId = useSelector((state) => {
    return state.project.id;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (projectId) {
      dispatch(saveAndDownload());
      dispatch(deleteProject(projectId));
    }
  }, [dispatch, projectId]);

  return (
    <>
      <div className='saveOrDelete'>
        <br />
        <div className='modal-buttons'>
          <button
            type='submit'
            className='project_delete_btn'
            value={projectId}
            onClick={(event) => deleteProject(event.target.value)}
          >
            Delete project
          </button>
          <button
            type='submit'
            className='project_saveAndDownload_btn'
            onClick={(event) => saveAndDownload(event.target.value)}
          >
            Save and Download
          </button>
        </div>
      </div>
    </>
  );
};

export default SaveOrDelete;
