import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { YTService } from "../service/api.service";
import { VideoType } from "../types";
import { useDispatch } from "react-redux";
import { setError, setIsLoading } from "../redux/slices/productSlice";

const Shorts = () => {
  const { id } = useParams<{ id: string }>();
  const [short, setShort] = useState<VideoType | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getShortDetails = async () => {
      if (id) {
        dispatch(setIsLoading(true));
        try {
          const data = await YTService.getVideoDetails(id);
          setShort(data);
        } catch (error) {
          console.log("Error fetching short details", error);
          dispatch(setError("Wrong ID"));
        } finally {
          dispatch(setIsLoading(false));
        }
      }
    };
    getShortDetails();
  }, [id, dispatch]);

  return (
    <div className=" min-h-screen container flex flex-col items-center justify-center">
      {short ? (
        <iframe
          className="w-auto flex h-full"
          src={`https://www.youtube.com/embed/${short.video_id}?autoplay=1&controls=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p className="text-white">Loading...</p>
      )}
    </div>
  );
};

export default Shorts;
