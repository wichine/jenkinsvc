import request from '../utils/request';
import is from 'is_js';

let mockProjects = [
    {"title":"Card title 000","description":"Card content card content\ntest test test!"},
    {"title":"Card title 111","description":"Card content card content\ntest test test!"},
    {"title":"Card title 222","description":"Card content card content\ntest test test!"},
    {"title":"Card title 333","description":"Card content card content\ntest test test!"},
    {"title":"Card title 444","description":"Card content card content\ntest test test!"},
    {"title":"Card title 555","description":"Card content card content\ntest test test!"},
    {"title":"Card title 666","description":"Card content card content\ntest test test!"},
    {"title":"Card title 777","description":"Card content card content\ntest test test!"},
    {"title":"Card title 888","description":"Card content card content\ntest test test!"},
    {"title":"Card title 999","description":"Card content card content\ntest test test!"},
    {"title":"Card title aaa","description":"Card content card content\ntest test test!"},
    {"title":"Card title bbb","description":"Card content card content\ntest test test!"},
    {"title":"Card title ccc","description":"Card content card content\ntest test test!"},
    {"title":"Card title ddd","description":"Card content card content\ntest test test!"},
    {"title":"Card title eee","description":"Card content card content\ntest test test!"},
    {"title":"Card title fff","description":"Card content card content\ntest test test!"}
];
export async function getProjects() {
  // return request('/vc/projects');
  return mockProjects;
}

export async function addProject(project) {
  if (is.propertyDefined(project,"title") && is.propertyDefined(project,"description")) {
    mockProjects.push(project)
    return mockProjects;
  } else {
    return (new Error("add project error!")).message;
  }
}

