declare namespace Album {

  type PicInfo = {
    id: string;
    albumId: string;
    url: string;
    sequence: number;
  }

  type Album = {
    id?: string;
    title?: string;
    station?: string;
    cover?: string;
    count?: number;
    tag?: string;
    author?: string;
    model?: string;
    summary?: string;
    file?;
  }
}
