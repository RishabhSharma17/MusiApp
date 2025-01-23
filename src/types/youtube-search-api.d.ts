
declare module "youtube-search-api" {
    interface Thumbnail {
        url: string;
        width: number;
        height: number;
    }

    interface VideoDetails {
        title: string;
        thumbnails: Thumbnail[];
    };

    export function  GetVideoDetails(videoId: string): Promise<videoDetails>;
}