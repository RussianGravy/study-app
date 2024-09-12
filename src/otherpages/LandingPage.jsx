import { Navbar } from "../components/Navbar";
import { PrettyThing } from "../components/PrettyThing";
import { useAuth } from "../contexts/AuthContext";
import background from "../assets/background.png";
import landing_icon from "../assets/landing_icon.png";
import mustache from "../assets/mustache_icon.png";

export function LandingPage() {
  const temp = useAuth();
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
      {temp.currentUser ? (
        <div className="mx-auto portrait:pt-10 pb-28">
          <a
            className="w-fit p-6 portrait:p-3 rounded-xl bg-blue-600 text-6xl portrait:text-3xl text-white"
            href="/"
          >
            Visit Your Dashboard
          </a>
        </div>
      ) : (
        <>
          <a
            className="w-fit mx-auto p-6 portrait:p-3 rounded-xl bg-blue-600 text-6xl portrait:text-3xl text-white"
            href="/signup"
          >
            Sign Up
          </a>
          <div className="mt-1 portrait:mt-4 m-auto pb-28 flex flex-row">
            <p>Already have an account?</p>
            <a className="ml-1 text-blue-500" href="login">
              Sign In
            </a>
          </div>
          {/* <h1 className="mt-16 portrait:mt-4 mx-auto text-black text-4xl portrait:text-2xl underline">
            About
          </h1>
          <p className="w-8/12 portrait:w-11/12 pb-10 portrait:pb-8 mt-7 portrait:mt-4 mx-auto text-black text-3xl portrait:text-xl text-center">
            This web app allows you to create <b> flashcards</b> individually
            and
            <b> collaboratively</b>! You can <b> friend</b> other users and add
            their Decks to your Dashboard, or you can create your own and
            <b> share </b> them.
          </p>
          <h1 className="mx-auto text-black text-4xl portrait:text-2xl underline">
            Technologies Used
          </h1>
          <p className="w-8/12 portrait:w-11/12 pb-20 portrait:pb-16 mt-7 portrait:mt-4 mx-auto text-black text-3xl portrait:text-xl text-center">
            This web app was produced using <b> React</b> and<b> Firebase</b>.
          </p> */}
        </>
      )}
    </div>
  );
}
