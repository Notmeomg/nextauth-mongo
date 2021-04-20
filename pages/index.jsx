import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";
import classNames from "classnames";

const Home = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ username: false, password: false });
  const [loading, setLoading] = useState(false);

  const usernameClass = classNames({
    "border-red-500": error.username,
  });
  const passwordClass = classNames({
    "border-red-500": error.password,
  });

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (username.length < 1) {
      setLoading(false);
      return setError({ ...error, username: "Username required." });
    }

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res.error?.toLowerCase().includes("username")) {
        setLoading(false);
        return setError({ ...error, username: res.error });
      }

      if (res.error?.toLowerCase().includes("password")) {
        setLoading(false);
        return setError({ ...error, password: res.error });
      }

      return router.push({
        pathname: "/dashboard",
      });
    } catch (err) {
      return err;
    }
  };

  return (
    <main className="container mx-auto h-screen py-4">
      <video
        loop
        autoPlay
        muted
        className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen object-cover"
      >
        <track kind="captions" />
        <source src="/login_bg_vid_rocky_coast.mp4" type="video/mp4" />
      </video>
      {/* <div className="next-image-container">
        <Image
          src="/turtle.jpg"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div> */}
      <section className="grid justify-items-center items-start mt-16">
        <form
          className="grid gap-4 bg-white bg-opacity-75 backdrop-filter backdrop-blur-md backdrop-opacity-80 filter drop-shadow-lg border p-8 rounded-2xl w-3/4 xl:w-1/3"
          onSubmit={handleSignIn}
        >
          <label
            htmlFor="username"
            className="grid gap-1 text-sm text-gray-600 justify-self-center md:w-3/4 lg:w-3/5 2xl:w-4/5"
          >
            <span className="text-gray-400">Username</span>
            <input
              type="text"
              id="username"
              className={`border rounded focus:ring-1 focus:ring-blue-500 p-1 outline-none h-9 ${usernameClass} shadow-md`}
              autoComplete="on"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setError({ ...error, username: false })}
            />
          </label>
          {error.username && (
            <span className="justify-self-center text-sm text-black text-opacity-75 font-semibold bg-red-300 px-2 py-1 rounded border border-black border-opacity-20 shadow">
              {error.username}
            </span>
          )}
          <label
            htmlFor="password"
            className="grid gap-1 text-sm text-gray-600 justify-self-center md:w-3/4 lg:w-3/5 2xl:w-4/5"
          >
            <span className="text-gray-400">Password</span>
            <input
              type="password"
              id="password"
              className={`border rounded focus:ring-1 focus:ring-blue-500 p-1 outline-none h-9 ${passwordClass} shadow-md`}
              autoComplete="on"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setError({ ...error, password: false })}
            />
          </label>
          {error.password && (
            <span className="justify-self-center text-sm text-black text-opacity-75 font-semibold bg-red-300 px-2 py-1 rounded border border-black border-opacity-20 shadow">
              {error.password}
            </span>
          )}
          <button
            type="submit"
            disabled={loading}
            className="justify-self-center py-1 px-2 rounded mt-2 text-md focus:outline-none focus:ring-1 focus:ring-blue-200 active:ring-blue-400 font-medium text-black text-opacity-50 2xl:text-opacity-60"
          >
            {loading ? (
              <svg
                className="animate-spin mx-auto h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Home;
