import img from "../assets/quiz-logo.png";
const Header = function () {
  return (
    <header className="flex flex-col items-center mt-10 mb-3 mx-auto gap-3  ">
      <img className="size-20 " src={img} alt="" />

      <h1 className="uppercase font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 tracking-widest stroke-black stroke-2">
        General knowledge quiz
      </h1>
    </header>
  );
};

export default Header;
