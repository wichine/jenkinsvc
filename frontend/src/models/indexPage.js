import { notification } from 'antd';
import { getProjects,addProject } from '../services/index.js';
import is from 'is_js';

export default {

  namespace: 'indexPage',

  state: {
    projects:[],
    projectsDisp:[],
    showAddNew:false
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
    *addNewProject({ project }, { call, put }) {
      let addResult = yield call(addProject,project);
      if (is.array(addResult)) {
        yield put({ type: "addNewReturn",ok: true,data: addResult})
      } else {
        yield put({ type: "addNewReturn",ok: false,data: addResult})
      }
    }
  },

  reducers: {
    refresh(state, {projects}) {
      // console.log("refresh");
      return { ...state, projects:[...projects],projectsDisp:[...projects] };
    },
    filter(state,{value}) {
      // console.log("filter");
      let dataDisp = state.projects;
      const f = (v) => {
        return (v.title && v.title.indexOf(value)>=0);
      };
      dataDisp = dataDisp.filter(f);
      return { ...state,projectsDisp:[...dataDisp]};
    },
    showAddModal(state,{show}) {
      return { ...state,showAddNew:show};
    },
    addNewReturn(state,{ ok,data }) {
      if (ok) {
        return { ...state,showAddNew:false,projects:[...data],projectsDisp:[...data]};
      }
      notification.error({message:"Error",description:data});
      return { ...state,showAddNew:false};
    }
  },

};
