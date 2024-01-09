import "ldrs/ping";

const Loader = ({ size, color }) => {
  return (
    <l-ping size={size ? size : "45"} speed={"2"} color={color ? color : "hsl(var(--primary))"} />
  );
};

export default Loader;
