import PulseLoader from "react-spinners/PulseLoader";

const Loading = () => {

    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    return (
        <div style={style}
        >
            <PulseLoader color="#74BDE0" />
            <div>Loading...</div>
        </div>
    )
}

export default Loading;