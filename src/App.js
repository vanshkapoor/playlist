import React,{useState} from 'react';
// import styled from 'styled-components';
import './App.css';
import YouTube from 'react-youtube';
// import Button from './common/Button';



function Videoqueue({vid,removeVideo}){
  const opts = {
    height: '390',
    width: '80%',
    paddingTop:'1%',
    playerVars: { 
      autoplay: 1
    }
  };

  const next=()=>{
    removeVideo(0)
  }

return(
  <div style={{color:'grey',paddingTop:'3%',textAlign:'center'}}>Video Playing - {vid.text}
  <YouTube
        videoId={vid.text.split("=")[1]}
        opts={opts}
        onEnd={next}
      />
  <div> <button type="button" className="btn btn-dark " onClick={() => removeVideo(0)}> NEXT </button></div>
  
   </div>
)
}

function Video({video,index,removeVideo})
{
  return <div className="list" 
    style={{ color:index == 0 ? 'grey' : 'white'}}>
      {index}.  {video.text}
    <div style={{'paddingLeft':'10%'}}> <button type="button"  className="btn btn-info " onClick={() => removeVideo(index)}> Delete </button></div>
    </div>;
}



function PlaylistForm({addVideo}){
  const [value,setValue] = useState("");

  const handleSubmit = e =>{
    e.preventDefault();
    if(!value){
      alert('input field empty')
      return;
    };
    if(value.split('=')[0] != "https://www.youtube.com/watch?v"){
      alert('input a correct field')
      return;
    }
    addVideo(value);
    setValue('');
  };

  return (
    <div style={{'padding':'6%'}}>
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-10 col-sm-10 ">
            <input type="text" value={value} className="form-control input"  onChange={e => setValue(e.target.value)} placeholder="add a video to playlist..."/>
        </div>
        <div className="col-lg-2 col-sm-2">
            <button type="button" class="btn btn-secondary" onClick={handleSubmit} >ADD</button>
        </div>
      </div>
    </form>
    </div>
  )
}



function App()
{
  const [videos, setVideos] = useState([
    {
      text:'https://www.youtube.com/watch?v=JQbjS0_ZfJ0',
    },
    // {
    //   text:'https://www.youtube.com/watch?v=D3o_yPtTbDc',
    // },
    // {
    //   text:'https://www.youtube.com/watch?v=EuPSibuIKIg',
    // }    
    ]);


const addVideo = text =>{
  const newVideos = [...videos,{text}];
  setVideos(newVideos);
}


const removeVideo = index =>{
  const newVideos = [...videos];
  newVideos.splice(index,1);
  setVideos(newVideos);
}


return(  
  <div className="app" style={{overflowX:'hidden'}}>
  <div className="row main">
    <div className="col-lg-8 col-sm-12 video">
      {console.log(videos.length)}
      
      {videos.length >0?<Videoqueue 
      vid={videos[0]}
      removeVideo={removeVideo}
      />:null}
      
    </div>
    <div className="col-lg-4 col-sm-12 playlist">
    <PlaylistForm addVideo={addVideo} />
      {videos.map((vids, index) => ( 
        <Video 
          key={index} 
          index={index} 
          video={vids} 
          removeVideo={removeVideo}
          />
        ))}
    </div>
  </div>

  </div>
  )
}

export default App;