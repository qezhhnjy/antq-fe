import {request} from "@@/plugin-request/request";

export async function infoList(query: API.AlbumQuery, options?: { [key: string]: any }) {
  return request<API.BaseResult<API.PageInfo<Album.PicInfo>>>('/antq/web/album/info-page', {
    method: 'POST',
    data: query,
    ...(options || {})
  })
}

export async function albumList(query: API.AlbumQuery, options?: { [key: string]: any }) {
  return request<API.BaseResult<API.PageInfo<Album.Album>>>('/antq/web/album/album-page', {
    method: 'POST',
    data: query,
    ...(options || {})
  })
}

export async function albumDelete(id: string, options?: { [key: string]: any }) {
  return request<API.BaseResult<API.PageInfo<Album.Album>>>('/antq/web/album/delete', {
    params: {id},
    method: 'DELETE',
    ...(options || {})
  })
}

export async function picDelete(id: string, options?: { [key: string]: any }) {
  return request<API.BaseResult<API.PageInfo<Album.Album>>>('/antq/web/album/delete-pic', {
    params: {id},
    method: 'DELETE',
    ...(options || {})
  })
}

export async function albumAdd(album: Album.Album, options?: { [key: string]: any }) {
  const {title, station, cover, tag, author, model, summary, file} = album;
  const data = new FormData();
  data.append('file', file[0].originFileObj);
  if (title) data.append('title', title);
  if (station) data.append('station', station);
  if (cover) data.append('cover', cover);
  if (tag) data.append('tag', tag);
  if (author) data.append('author', author);
  if (model) data.append('model', model);
  if (summary) data.append('summary', summary);
  return request<API.BaseResult<any>>('/antq/web/album/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
    ...(options || {}),
  });
}