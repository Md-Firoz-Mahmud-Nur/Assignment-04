import { FiLoader } from "react-icons/fi";

const Loader = () => {
  return (
    <div className="w-screen h-screen m-auto ">
      <FiLoader className="text-[2.8rem] animate-spin text-[#3B9DF8] m-auto" />
    </div>
  );
};

export default Loader;
