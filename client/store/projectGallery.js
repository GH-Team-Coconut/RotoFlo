import axios from 'axios';

const TOKEN = 'token';

const SET_PROJECT_GALLERY = 'SET_PROJECT_GALLERY';
const DELETE_PROJECT = 'DELETE_PROJECT';
const SAVE_AND_DOWNLOAD = 'SAVE_AND_DOWNLOAD';


export const setProjectGallery = (gallery) => {
  return {
    type: SET_PROJECT_GALLERY,
    gallery,
  };
};

export const _deleteProject = (project) => {
  return {
    type: DELETE_PROJECT,
    project,
  };
};

export const _saveAndDownload = (project) => {
  return {
    type: SAVE_AND_DOWNLOAD,
    project,
  };
};

export const fetchProjectGallery = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: projectGallery } = await axios.get(`/api/gallery`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(setProjectGallery(projectGallery));
    } catch (error) {
      console.error(
        'you know what... I think this is a you problem. Yep. Yep it is. Check your fetchProjectGallery thunkity thunk.'
      );
      console.log(error);
    }
  };
};

export const deleteProject = (projectId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.delete(
        `/api/gallery`,
        {
          data: {
            projectId: projectId,
          },
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(_deleteProject(data));
    } catch (error) {
      console.error(
        'listen, Im doing what I can here but you gotta check out your deleteProject thunk. '
      );
      console.log(error);
    }
  };
};

export const saveAndDownload =()=> {}
//needs to make request to project table in db to save the info and needs to include userid and
//runs download function get teams help on this.

const initialState = [];

export default function galleryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROJECT_GALLERY:
      return action.gallery;
    case DELETE_PROJECT:
      return state.filter((project) => project.id !== action.project.id);
    default:
      return state;
  }
}
