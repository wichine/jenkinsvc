import { getProjects } from '../services/projects.js';
import is from 'is_js';

export default {

  namespace: 'indexPage',

  state: {
    projects:[],
    projectsDisp:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({type:"fetchProjects"});
    },
  },

  effects: {
    *fetchProjects({ payload }, { call, put }) {  // eslint-disable-line
      let projects = yield call(getProjects);
      if (is.array(projects)) {
        yield put({ type: "refresh",projects:projects });
      }
    },
  },

  reducers: {
    refresh(state, {projects}) {
      console.log("refresh");
      return { ...state, projects:projects,projectsDisp:projects };
    },
    filter(state,{value}) {
      console.log("filter");
      let dataDisp = state.projects;
      const f = (v) => {
        return (v.title && v.title.indexOf(value)>=0);
      };
      dataDisp = dataDisp.filter(f);
      return { ...state,projectsDisp:[...dataDisp]}
    }
  },

};
