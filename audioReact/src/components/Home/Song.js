const song = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
      <audio controls>
        <source
          src={`http://127.0.0.1:8000${props.audio}`}
          type="audio/mp3"
        />
      </audio>
    </>
  );
};

export default song;
