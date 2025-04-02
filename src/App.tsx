import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setError, setIsLoading, setVideos } from "./redux/slices/productSlice";
import { videos } from "./mock-data";
import { Home, Navbar, VideoDetails } from "./components";
import Chanel from "./components/Chanel";
import Shorts from "./components/Shorts";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getVideos = async () => {
      dispatch(setIsLoading(true));
      try {
        setTimeout(() => {
          dispatch(setVideos(videos));
        }, 2000);
      } catch (err) {
        console.log(err);
        dispatch(setError("Something went wrong! Please try again later!"));
      } finally {
        setTimeout(() => {
          dispatch(setIsLoading(false));
        }, 2000);
      }
    };
    getVideos();
  }, []);
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="flex">
        {/* <Sidebar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos/:id" element={<VideoDetails />} />
          <Route path="/chanel/:id" element={<Chanel />} />
          <Route path="/shorts/:id" element={<Shorts />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
