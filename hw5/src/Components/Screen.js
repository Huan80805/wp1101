import "./Screen.css";

const Screen = (props) => {
  return (
    <p className="screen" mode="single" max={70}>
      {props.value}
    </p>
  );
};

export default Screen;