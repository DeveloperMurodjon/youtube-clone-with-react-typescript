import React from "react";
import { VideoType } from "../types";
import { Link } from "react-router-dom";

interface PropsTypes {
  video: VideoType;
}

const VideoCard: React.FC<PropsTypes> = ({ video }) => {
  const ConvertViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000 && views < 1000000) {
      return `${(views / 1000).toFixed(1)}K`;
    } else {
      return views;
    }
  };

  return (
    <div>
      <Link to={`/videos/${video.video_id}`}>
        <div className="hover:bg-blue-950 pb-1 rounded-md relative">
          <img
            src={video.thumbnails[1].url}
            className="w-full rounded-lg aspect-video object-cover"
            alt={video.title}
          />
          <span className="inline-block text-sm px-2 rounded py-0.5 font-semibold absolute bottom-18 right-2 bg-black/70">
            {video.video_length}
          </span>
          <h3 className="text-lg line-clamp-2">{video.title}</h3>
        </div>
      </Link>
      {/* Chanel  */}
      <Link to={`/chanel/${video.channel_id}`}>
        <div className="hover:bg-blue-950 p-1 pt-0 rounded-md">
          <img src={`/chanel/${video.thumbnails[0].url}`} alt="" />
          <div>
            <p className="text-gray-300 mt-2">{video.author}</p>
            <div className="flex gap-2 opacity-60 text-sm items-center">
              <span>{ConvertViews(video.number_of_views)} viewed</span>
              <span className="text-2xl leading-0">&#183;</span>
              <span>{video.published_time}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
