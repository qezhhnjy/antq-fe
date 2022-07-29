import {request} from "@@/plugin-request/request";

export async function albumList(query: API.AlbumQuery, options?: { [key: string]: any }) {
  return request<API.BaseResult<API.PageInfo<Album.PicInfo>>>('/antq/web/album/info-page', {
    method: 'POST',
    data: query,
    ...(options || {})
  })
}
