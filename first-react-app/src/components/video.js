import "./video.css";

function Video({ title, channel, views, time, verified}){
  return (
    <>
      <div className="container">
        <div><div className="pic">
          <img
            alt="sample"
            src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
          ></img>
        </div></div>
        <div><div className="title">{title} Video</div>
        <div className="channel">{channel}{verified  &&"✔️" }</div>
        <div className="views">
          {views} Views <span>.</span>
          {time}
        </div></div>
      </div>
    </>
  );
};

export default Video;
