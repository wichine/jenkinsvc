import { notification } from 'antd';
import { getVersions,submit } from '../services/project.js';
import is from 'is_js';

export default {

  namespace: 'projectPage',

  state: {

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      
    },
  },

  effects: {
    *submitVersionInfo({ info }, { call, put }) {  // eslint-disable-line
      let versionInfo = yield call(submit);
      if (is.array(versionInfo)) {
        yield put({ type: "refresh" });
      }
    },
  },

  reducers: {
    refresh(state, {payload}) {
      // console.log("refresh");
      return { ...state };
    },
  },

};
