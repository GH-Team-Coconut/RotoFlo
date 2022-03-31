import axios from "axios";

const TOKEN = "token";

const SET_PROJECT_GALLERY = "SET_PROJECT_GALLERY";
const DELETE_PROJECT = "DELETE_PROJECT";
const SAVE_TO_DATABASE = "SAVE_TO_DATABASE";

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

export const _saveToDatabase = (project) => {
  return {
    type: SAVE_TO_DATABASE,
    project
  }
}

export const fetchProjectGallery = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: gallery } = await axios.get(`/api/gallery`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(setProjectGallery(gallery));
    } catch (error) {
      console.error(
        "you know what... I think this is a you problem. Yep. Yep it is. Check your fetchProjectGallery thunkity thunk."
      );
      console.log(error);
    }
  };
};

export const deleteProject = (projectId, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: project } = await axios.delete(
        `/api/gallery/${projectId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(_deleteProject(project));
      history.push('/gallery')
    } catch (error) {
      console.error(
        "listen, Im doing what I can here but you gotta check out your deleteProject thunk. "
      );
      console.log(error);
    }
  };
};

export const saveToDatabase = (project) => {
  return async (dispatch) => {
    try{
      const token = window.localStorage.getItem(TOKEN);
      const { data: created } = await axios.post('/api/gallery/', project, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_saveToDatabase(created));
    } catch (error) {
      console.error(
        "did you press save dumb B!"
      );
      console.log(error)
    }
  }
}

const initialState = [];

export default function galleryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROJECT_GALLERY:
      return action.gallery;
    case DELETE_PROJECT:
      return state.filter((project) => project.id !== action.project.id);
      case SAVE_TO_DATABASE:
      return [...state, action.project];
    default:
      return state;
  }
}
