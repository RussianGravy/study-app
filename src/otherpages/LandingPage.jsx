import { Navbar } from "../components/Navbar";
import background from "../assets/background.png";
import landing_icon from "../assets/landing_icon.png";
import mustache from "../assets/mustache_icon.png";

export function LandingPage() {
  return (
    <div className="w-screen h-screen relative flex flex-col ">
      <Navbar />
      <img
        src={background}
        className="w-screen h-screen fixed top-0 left-0 opacity-15 -z-10"
      />
      <h1 className="w-fit mt-28 mx-auto text-gray-600 text-6xl portrait:text-4xl text-center font-bold">
        Welcome to my social study app!
      </h1>
      <img
        className="aspect-auto w-96 portrait:w-72 mt-20 portrait:mt-14 mx-auto"
        src={landing_icon}
      />
      <h1 className="mt-8 mx-auto text-gray-600 text-4xl portrait:text-2xl text-center">
        Make, Share, Study
      </h1>
      <img className="w-10/12 portrait:11/12 mx-auto" src={mustache} />
      <h1 className="mx-auto text-gray-600 text-4xl portrait:text-2xl underline">
        About
      </h1>
      <p className="w-8/12 portrait:w-11/12 pb-10 mt-7 mx-auto text-gray-600 text-3xl portrait:text-xl text-center">
        This web app allows you to create <b> flashcards</b> individually and
        <b> collaboratively</b>! You can <b> friend</b> other users and add
        their <b> Decks</b> to your Dashboard, or you can create your own and
        <b> share </b> them.
      </p>
    </div>
  );
}
