import "./App.css";
import Video from "./components/video";
import data_list from  "./data/data.js";
import Header from "./components/header";






function App() {

  return (
    <>
    <Header/>
    <div className="App">
      {
        data_list.map(video =><Video
          key = {video.id}
          title={video.title}
          views={video.views}
          time={video.time}
          channel={video.channel}
          verified = {video.verified}
        ></Video>)
      }
      
    </div>
    </>
  );
}; 

export default App;


