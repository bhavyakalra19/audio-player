import React, { useState, useEffect, useRef } from "react";
import SongList from "./SongList";
import Card from "../UI/Card/Card";
import classes from "./Home.module.css";
import Song from "./Song";

const Home = (props) => {
  const [musicList, setMusicList] = useState([]);
  const [songSearchWord, setSongSearchWord] = useState("");
  const [currentSong, setCurrentSong] = useState({
    audio: "",
    name: "",
  });
  const searchWordref = useRef();
  console.log(musicList);

  const fetchSearchData = async (enteredWord) => {
    const urlPath = "http://127.0.0.1:8000/api-auth/get-music";
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `token ${props.token}`);
    try {
      const jsonCreds = {
        name: enteredWord,
      };
      const response = await fetch(urlPath, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(jsonCreds),
      });

      if (response.ok) {
        const data = await response.json();
        setMusicList(data);
      }
    } catch (error) {
      console.log("Error fetching data from Backend:", error);
    }
  };

  const currentSongHandler = (name, audio) => {
    setCurrentSong({
      audio: audio,
      name: name,
    });
    
  };
  const songPlayer = <Song name={currentSong.name} audio={currentSong.audio} />;
  useEffect(() => {
    fetchSearchData(songSearchWord);
  }, [songSearchWord]);

  const songsListMapped = musicList
    ? musicList.map((song, index) => (
        <SongList
          id={index}
          key={index}
          playBtn={currentSongHandler}
          name={song.audio_name}
          img={song.audio_image}
          genre={song.audio_genre}
          audio={song.audio_data}
        />
      ))
    : "";

  const songSearchHandler = () => {
    setSongSearchWord(searchWordref.current.value);
  };

  return (
    <React.Fragment>
      <Card className={classes.home}>
        <div>
          <input placeholder="Enter a song name" ref={searchWordref} />
          <button onClick={songSearchHandler}>Search</button>
        </div>
        <h1>List Of Songs from Api</h1>
        <ul>{songsListMapped}</ul>
      </Card>
      {currentSong.name && <Card className={classes.home}>
        {songPlayer}
      </Card>}
    </React.Fragment>
  );
};

export default Home;
