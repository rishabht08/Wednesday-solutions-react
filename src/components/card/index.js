import React from "react";
import { useEffect, memo, useState } from 'react';

import "antd/dist/antd.css";

import { Card, Avatar } from "antd";
import { PlayCircleOutlined , PauseCircleOutlined  } from "@ant-design/icons";

const { Meta } = Card;

export default function MusicCards(props) {

  const [playing, setPlaying] = useState(false);

  const onCardClick = () => {


    let audio_elements = document.body.getElementsByTagName("AUDIO")
    if(audio_elements.length==0){
      let x = document.createElement("AUDIO");
      document.body.appendChild(x);
      x.setAttribute("src", props.previewUrl);
      x.controls = false;
      x.play()
      setPlaying(true)

    }
    else{
      
    for(let i=0; i < audio_elements.length; i++) {
   
      let audio_element = audio_elements[i];
      if (audio_element.src == props.previewUrl) {
        if(!audio_element.paused){
          audio_element.pause();
          setPlaying(false)
        }
        else{
          audio_element.play()
          setPlaying(true)
        }
       
      }
      else{
        setPlaying(false)
        audio_element.setAttribute("src" , props.previewUrl)
        audio_element.play()
        setPlaying(true)
      }
    }
  }


   

   
    // x.play()
   
    // x.addEventListener("play", function(event) {
    //   console.log("event" , event)
    //   let audio_elements = document.body.getElementsByTagName("AUDIO")
      
    //     for(let i=0; i < audio_elements.length; i++) {
    //       let audio_element = audio_elements[i];
    //       if (audio_element !== event.target) {
    //         audio_element.pause();
    //       }
    //       else{
    //         console.log("is it though" , audio_element.paused)
    //         if(!audio_element.paused){
    //           audio_element.pause()
    //         }
    //         else{
    //           audio_element.play()
    //         }
    //       }
    //     }
    //   }, true);
  
  };
  return (
    <Card
      onClick={() => onCardClick()}
      style={{ width: 200 }}
      cover={<img alt="example" src={props.artworkUrl} />}
      actions={playing ? [<PauseCircleOutlined />] : [<PlayCircleOutlined />]}
    >
      <Meta
        avatar={<Avatar src={props.artworkUrl} />}
        title={props.trackName}
        description={props.artistName}
      />
    </Card>
  );
}
