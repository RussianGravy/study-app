import { Navbar } from "../components/Navbar";
import { PrettyThing } from "../components/PrettyThing";
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
      <h1 className="w-fit mt-20 mx-auto text-black text-6xl portrait:text-4xl text-center font-bold">
        Welcome to my social study app!
      </h1>
      <PrettyThing />
      <img className="w-10/12 portrait:11/12 mx-auto" src={mustache} />
      <h1 className="mx-auto text-black text-4xl portrait:text-2xl underline">
        About
      </h1>
      <p className="w-8/12 portrait:w-11/12 pb-10 portrait:pb-8 mt-7 portrait:mt-4 mx-auto text-black text-3xl portrait:text-xl text-center">
        This web app allows you to create <b> flashcards</b> individually and
        <b> collaboratively</b>! You can <b> friend</b> other users and add
        their <b> Decks</b> to your Dashboard, or you can create your own and
        <b> share </b> them.
      </p>
      <h1 className="mx-auto text-black text-4xl portrait:text-2xl underline">
        Technologies Used
      </h1>
      <p className="w-8/12 portrait:w-11/12 pb-20 portrait:pb-16 mt-7 portrait:mt-4 mx-auto text-black text-3xl portrait:text-xl text-center">
        This web app was produced using <b> React</b> and<b> Firebase</b>.
      </p>
      {/* <div className="mt-7 mx-auto portrait:mt-4 pb-10 portrait:pb-8 text-black text-4xl portrait:text-2xl text-center flex flex-row">
        <h1>Check out the</h1>
        <a
          className="ml-2 text-blue-500 underline"
          href="https://github.com/RussianGravy/study-app"
          target="_blank"
        >
          The Repo
        </a>
      </div> */}
    </div>
  );
}
