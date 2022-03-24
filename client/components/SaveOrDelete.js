//this lil dude will pop up when we hit stop capture
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveAndDownload } from '../store/singleProject'; //write this
import { _deleteProject } from '../store/projectGallery'

const SaveOrDelete = () => {

  const projectId = useSelector((state) => {
    return state.project.id;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (projectId) {
      dispatch(saveAndDownload()); //still need to be written
      dispatch(_deleteProject(projectId));
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
                onClick={(event) => _deleteProject(event.target.value)}
              >
                Delete project
              </button>
              <button
                type='submit'
                className='project_saveAndDownload_btn'
                // value={projectId}
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


