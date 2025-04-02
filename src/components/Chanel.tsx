import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setError, setIsLoading } from "../redux/slices/productSlice";
import { YTService } from "../service/api.service";
import { ChannelType, VideoType } from "../types";
import NavChanel from "./NavChanel";

function Chanel() {
  const { id } = useParams<{ id: string }>();
  const [chanel, setChanel] = useState<ChannelType | null>(null);
  const [activeTab, setActiveTab] = useState("Videos");
  const [channelVideos, setChannelVideos] = useState<VideoType[]>([]);
  const [channelShorts, setChannelShorts] = useState<VideoType[]>([]);
  const dispatch = useDispatch();

  // Chanel Details
  useEffect(() => {
    const getChanelDetails = async () => {
      if (id) {
        dispatch(setIsLoading(true));
        try {
          const data = await YTService.getChannelDetails(id);
          setChanel(data);
        } catch (error) {
          dispatch(setError("Wrong Id"));
          console.log("Wrong or null channel", error);
        } finally {
          dispatch(setIsLoading(false));
        }
      }
    };
    getChanelDetails();
  }, [id, dispatch]);

  // Api calls for videos and shorts
  useEffect(() => {
    const fetchChannelContent = async () => {
      if (id) {
        dispatch(setIsLoading(true));
        try {
          if (activeTab === "Videos") {
            const data = await YTService.getChannelVideos(id);
            setChannelVideos(data.videos || []);
          } else if (activeTab === "Shorts") {
            const data = await YTService.getChannelShorts(id);
            setChannelShorts(data.videos || []);
          }
        } catch (error) {
          console.log("Error fetching channel content", error);
          dispatch(setError("Error fetching channel content"));
        } finally {
          dispatch(setIsLoading(false));
        }
      }
    };
    if (activeTab === "Videos" || activeTab === "Shorts") {
      fetchChannelContent();
    }
  }, [id, activeTab, dispatch]);

  return (
    <div className="container  text-white w-full min-h-screen">
      {/* Banner */}
      <div className="relative w-full h-60">
        {chanel?.banner?.[0] && (
          <img
            className="w-full h-full rounded-md"
            src={chanel.banner[0].url}
            width={chanel.banner[0].width}
            height={chanel.banner[0].height}
            alt="Channel Banner"
          />
        )}
      </div>

      {/* Channel Info */}
      <div className="relative px-8 py-4">
        <div className="flex items-center gap-6">
          {chanel?.avatar?.[0] && (
            <img
              className="w-24 h-24 rounded-full border-4 border-[#0f0f0f] -mt-12"
              src={chanel.avatar[0].url}
              alt="Channel Avatar"
              width={chanel.avatar[0].width}
              height={chanel.avatar[0].height}
            />
          )}
          <div>
            <h2 className="text-2xl font-bold">{chanel?.title}</h2>
            <p className="text-gray-400 text-sm">@{chanel?.channel_id}</p>
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <p>{chanel?.subscriber_count} subscribers</p>
              <p>20 videos</p>
            </div>
          </div>
          <button className="ml-auto bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-200">
            Subscribe
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="px-8 pb-4">
        <p className="text-gray-300 text-sm">{chanel?.description}</p>
      </div>

      {/* Navigation */}
      <NavChanel activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div className="px-8 py-4">
        {activeTab === "Videos" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {channelVideos.map((video) => (
              <Link to={`/videos/${video.video_id}`} key={video.video_id}>
                <div className=" p-2 rounded hover:bg-gray-700 transition">
                  <img
                    src={video.thumbnails[0].url}
                    alt={video.title}
                    className="w-full rounded-md object-contain"
                  />
                  <h3 className="mt-2 text-sm font-semibold">{video.title}</h3>
                  <div className="text-xs text-gray-400 mt-1">
                    <span>{video.number_of_views} views</span>
                    <span className="mx-1">•</span>
                    <span>{video.published_time}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        {/* Shorts */}
        {activeTab === "Shorts" && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {channelShorts.map((video) => (
              <Link to={`/shorts/${video.video_id}`} key={video.video_id}>
                <div className="bg-transparent p-0 hover:bg-gray-700 transition">
                  <img
                    src={video.thumbnails[0].url}
                    alt={video.title}
                    className="w-full rounded-md "
                  />
                  <h3 className="mt-1 text-sm font-bold text-center">
                    {video.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
        {activeTab !== "Videos" && activeTab !== "Shorts" && (
          <div className="p-4 text-center text-gray-400">
            <p>{activeTab}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chanel;
