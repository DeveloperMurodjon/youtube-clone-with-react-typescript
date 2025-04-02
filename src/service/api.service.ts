import axios from "axios";
import { VideoType } from "../types";

const BASE_URL = `${
  import.meta.env.VITE_PROTOCOL || process?.env.VITE_PROTOCOL
}://${import.meta.env.VITE_HOSTNAME || process?.env.VITE_HOSTNAME}`;

axios.interceptors.request.use((config) => {
  config.baseURL = BASE_URL;
  config.headers.set(
    "x-rapidapi-key",
    import.meta.env.VITE_XRAPIDAPIKEY || process?.env.VITE_XRAPIDAPIKEY
  );
  config.headers.set(
    "x-rapidapi-host",
    import.meta.env.VITE_XRAPIDAPIHOST || process?.env.VITE_XRAPIDAPIHOST
  );
  return config;
});

export const YTService = {
  getRecommended: async (): Promise<VideoType[]> => {
    const { data } = await axios.get(
      `video/recommendations?video_id=Y_AJvHdgu9A`
    );
    return data;
  },
  getVideoDetails: async (id: string): Promise<VideoType> => {
    const { data } = await axios.get(`video/details?video_id=${id}`);
    return data;
  },
  getComments: async (
    videoId: string
  ): Promise<{ author: string; text: string }[]> => {
    const { data } = await axios.get(`video/comments?video_id=${videoId}`);
    return data;
  },
  getChannelDetails: async (id: string) => {
    const { data } = await axios.get(`channel/details?channel_id=${id}`);
    return data;
  },
  getChannelVideos: async (
    channelId: string
  ): Promise<{ videos: VideoType[] }> => {
    const { data } = await axios.get(`channel/videos?channel_id=${channelId}`);
    return data;
  },
  getChannelShorts: async (
    channelId: string
  ): Promise<{ videos: VideoType[] }> => {
    const { data } = await axios.get(`channel/shorts?channel_id=${channelId}`);
    return data;
  },
};
