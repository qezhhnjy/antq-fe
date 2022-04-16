import {request} from "@@/plugin-request/request";

export async function userInfo(options?: { [key: string]: any }) {
  return request<API.BaseResult<API.UserVO>>('/antq/oauth/account/user', {
    method: 'GET',
    ...(options || {}),
    skipErrorHandler: true,
  });
}

export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  const data = new FormData();
  data.append('username', body.username || '');
  data.append('password', body.password || '');
  data.append('grant_type', 'password');
  data.append('client_id', 'client-app');
  data.append('client_secret', '123456');
  return request<API.LoginResult>('/antq/oauth/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
    ...(options || {}),
  });
}

export async function addUser(
  user: API.User,
  roleList: API.Role[],
  options?: { [key: string]: any },
) {
  return request('/antq/oauth/user/add', {
    method: 'POST',
    data: {user, roleList},
    ...(options || {}),
  });
}

export async function addMenu(menuVO: API.MenuVO, options?: { [key: string]: any }) {
  return request('/antq/oauth/menu/add', {
    method: 'POST',
    data: menuVO,
    ...(options || {}),
  });
}

export async function addRole(roleVO: API.RoleVO, options?: { [key: string]: any }) {
  return request('/antq/oauth/role/add', {
    method: 'POST',
    data: roleVO,
    ...(options || {}),
  });
}

export async function addOptional(optional: API.FinanceOptional, options?: { [key: string]: any }) {
  return request('/antq/web/finance-optional/add', {
    method: 'POST',
    data: optional,
    ...(options || {}),
  });
}

export async function addRecord(record: API.TimelineRecord, options?: { [key: string]: any }) {
  return request('/antq/oauth/record/add', {
    method: 'POST',
    data: record,
    ...(options || {}),
  });
}

export async function addBlog(blog: API.Blog, options?: { [key: string]: any }) {
  return request('/antq/oauth/blog/add', {
    method: 'POST',
    data: blog,
    ...(options || {}),
  });
}

export async function queryUser(query?: API.Query, options?: { [key: string]: any }) {
  return request<API.BaseResult<API.PageInfo<API.UserVO>>>('/antq/oauth/user/query', {
    method: 'POST',
    data: {...query},
    ...(options || {}),
  });
}

export async function queryRole(query?: API.Query, options?: { [key: string]: any }) {
  return request<API.BaseResult<API.PageInfo<API.RoleVO>>>('/antq/oauth/role/query', {
    method: 'POST',
    data: {...query},
    ...(options || {}),
  });
}

export async function queryMenu(query?: API.Query, options?: { [key: string]: any }) {
  return request<API.BaseResult<API.PageInfo<API.MenuVO>>>('/antq/oauth/menu/query', {
    method: 'POST',
    data: {...query},
    ...(options || {}),
  });
}

export async function queryLoginInfo(query?: API.Query, options?: { [key: string]: any }) {
  return request<API.BaseResult<API.PageInfo<API.LoginInfo>>>('/antq/oauth/login-info/query', {
    method: 'POST',
    data: {...query},
    ...(options || {}),
  });
}

export async function queryBlog(query?: API.Query, options?: { [key: string]: any }) {
  return request<API.BaseResult<API.PageInfo<API.Blog>>>('/antq/oauth/blog/query', {
    method: 'POST',
    data: {...query},
    ...(options || {}),
  });
}

export async function listMenu(query?: API.Query, options?: { [key: string]: any }) {
  return request<API.BaseResult<API.MenuVO[]>>('/antq/oauth/menu/list', {
    method: 'POST',
    data: {...query},
    ...(options || {}),
  });
}

export async function listRole(query?: API.Query, options?: { [key: string]: any }) {
  return request<API.BaseResult<API.RoleVO[]>>('/antq/oauth/role/list', {
    method: 'POST',
    data: {...query},
    ...(options || {}),
  });
}

export async function listRecord(options?: { [key: string]: any }) {
  return request<API.BaseResult<API.TimelineRecord[]>>('/antq/oauth/record/list', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function listBlog(options?: { [key: string]: any }) {
  return request<API.BaseResult<API.Blog[]>>('/antq/oauth/blog/list', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function deleteUser(id: string, options?: { [key: string]: any }) {
  return request<API.BaseResult<any>>('/antq/oauth/user/delete', {
    params: {id},
    method: 'DELETE',
    ...(options || {}),
    skipErrorHandler: true,
  });
}

export async function deleteRole(id: string, options?: { [key: string]: any }) {
  return request<API.BaseResult<any>>('/antq/oauth/role/delete', {
    params: {id},
    method: 'DELETE',
    ...(options || {}),
    skipErrorHandler: true,
  });
}

export async function deleteMenu(id: string, options?: { [key: string]: any }) {
  return request<API.BaseResult<any>>('/antq/oauth/menu/delete', {
    params: {id},
    method: 'DELETE',
    ...(options || {}),
    skipErrorHandler: true,
  });
}

export async function deleteOptional(symbol: string, options?: { [key: string]: any }) {
  return request('/antq/web/finance-optional/delete', {
    method: 'DELETE',
    params: {symbol},
    ...(options || {}),
  });
}

export async function deleteRecord(id: string, options?: { [key: string]: any }) {
  return request('/antq/oauth/record/delete', {
    method: 'DELETE',
    params: {id},
    ...(options || {}),
  });
}

export async function deleteBlog(id: string, options?: { [key: string]: any }) {
  return request('/antq/oauth/blog/delete', {
    method: 'DELETE',
    params: {id},
    ...(options || {}),
  });
}

export async function updateUser(
  user: API.User,
  roleList: API.Role[],
  options?: { [key: string]: any },
) {
  return request('/antq/oauth/user/update', {
    method: 'PUT',
    data: {user, roleList},
    ...(options || {}),
  });
}

export async function updateRole(roleVO: API.RoleVO, options?: { [key: string]: any }) {
  return request('/antq/oauth/role/update', {
    method: 'PUT',
    data: roleVO,
    ...(options || {}),
  });
}

export async function updateMenu(menuVO: API.MenuVO, options?: { [key: string]: any }) {
  return request('/antq/oauth/menu/update', {
    method: 'PUT',
    data: menuVO,
    ...(options || {}),
  });
}

export async function updateRecord(record: API.TimelineRecord, options?: { [key: string]: any }) {
  return request('/antq/oauth/record/update', {
    method: 'PUT',
    data: record,
    ...(options || {}),
  });
}

export async function updateBlog(blog: API.Blog, options?: { [key: string]: any }) {
  return request('/antq/oauth/blog/update', {
    method: 'PUT',
    data: blog,
    ...(options || {}),
  });
}

export async function treeMenu(menu: boolean) {
  return request<API.BaseResult<API.Tree>>('/antq/oauth/menu/tree?menu=' + menu, {
    method: 'GET',
  });
}

export async function detailBlog(id: string) {
  return request<API.BaseResult<API.Blog>>('/antq/oauth/blog/detail', {
    method: 'GET',
    params: {id},
  });
}

export async function monitor() {
  return request<API.BaseResult<API.SystemInfo>>('/antq/web/monitor', {
    method: 'GET',
  });
}

export async function redis() {
  return request<API.BaseResult<API.RedisInfo[]>>('/antq/web/monitor/redis', {
    method: 'GET',
  });
}

export async function upload(file: any, options?: { [key: string]: any }) {
  const data = new FormData();
  data.append('file', file);
  return request<API.BaseResult<any>>('/antq/web/minio/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
    ...(options || {}),
  });
}

export async function queryJob(query?: API.Query, options?: { [key: string]: any }) {
  return request<API.BaseResult<API.PageInfo<Quartz.JobAndTrigger>>>('/antq/web/job/query', {
    method: 'POST',
    data: {...query},
    ...(options || {}),
  });
}

export async function addJob(jobInfo: Quartz.JobInfo, options?: { [key: string]: any }) {
  return request<API.BaseResult<any>>('/antq/web/job/add', {
    method: 'POST',
    data: jobInfo,
    ...(options || {}),
  })
}

export async function deleteJob(jobAndTrigger: Quartz.JobAndTrigger, options?: { [key: string]: any }) {
  return request<API.BaseResult<any>>('/antq/web/job/delete', {
    method: 'POST',
    data: jobAndTrigger,
    ...(options || {}),
  })
}

export async function pauseJob(jobAndTrigger: Quartz.JobAndTrigger, options?: { [key: string]: any }) {
  return request<API.BaseResult<any>>('/antq/web/job/pause', {
    method: 'POST',
    data: jobAndTrigger,
    ...(options || {}),
  })
}

export async function resumeJob(jobAndTrigger: Quartz.JobAndTrigger, options?: { [key: string]: any }) {
  return request<API.BaseResult<any>>('/antq/web/job/resume', {
    method: 'POST',
    data: jobAndTrigger,
    ...(options || {}),
  })
}

export async function cronJob(jobAndTrigger: Quartz.JobAndTrigger, options?: { [key: string]: any }) {
  return request<API.BaseResult<any>>('/antq/web/job/cron', {
    method: 'POST',
    data: jobAndTrigger,
    ...(options || {}),
  })
}
