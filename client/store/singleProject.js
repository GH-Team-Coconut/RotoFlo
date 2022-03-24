import axios from 'axios';

const TOKEN = 'token';

const SET_PROJECT = 'SET_PROJECT';

export const setProject = (project) => {
  return {
    type: SET_PROJECT,
    project,
  };
};

export const fetchProject = (projectId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: project } = await axios.get(
        `/api/project`,
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
      dispatch(setProject(project));
    } catch (error) {
      console.error(
        'look Im not trying to be rude but low key... just take a look at your fetch project thunk okay'
      );
      console.log(error);
    }
  };
};

const initialState = {};

export default function galleryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROJECT:
      return action.project;
    default:
      return state;
  }
}
