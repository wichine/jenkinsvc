import request from '../utils/request';
import is from 'is_js';

let mockJobs = [
    {"name":"jobtest","url":"http://localhost:10083/job/jobtest",color:"red"},
    {"name":"multitest","url":"http://localhost:10083/job/multitest",color:"green"},
    {"name":"pipetest","url":"http://localhost:10083/job/pipetest",color:"gray"},
    {"name":"test","url":"http://localhost:10083/job/test",color:"green"},
];

export async function getJobs() {
  return mockJobs;
}
