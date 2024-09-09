import classes from './songList.module.css';

const SongList = (props) => {

  const playHandler = () => {
    props.playBtn(props.name,props.audio)
  }

  return (
    <li className={classes.song}>
      <div className={classes.nav}>
        <button onClick={playHandler}>Play Song</button>
      </div>
      <div>
        <h3 className={classes.name}>{props.name}</h3>
      </div>
      <div>
        <img src={`http://127.0.0.1:8000${props.img}`} alt={props.name} width="70" height="auto"/>
      </div>
    </li>
  );
};

export default SongList;
