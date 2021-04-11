import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
// import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/client";
// import Head from "next/head";
// import styles from "../styles/Home.module.css";

const Home = () => {
  // const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    // router.push({
    //   pathname: "/dashboard",
    //   query: { user: true },
    // });
  };

  // useEffect(() => {
  //   console.log(username);
  // }, [username]);

  // useEffect(() => {
  //   console.log(password);
  // }, [password]);

  return (
    <main className="container mx-auto h-screen py-4">
      <section className="grid justify-items-center items-start mt-16">
        <form className="grid gap-4 border border-red-100 p-8 rounded-2xl shadow-lg w-3/4 xl:w-1/2">
          <label
            htmlFor="username"
            className="grid gap-1 text-sm text-gray-600 md:w-3/4 md:mx-auto lg:w-3/5 2xl:w-1/2"
          >
            <span className="text-gray-400">Username</span>
            <input
              type="text"
              id="username"
              className="border shadow-md rounded focus:ring-1 focus:ring-blue-500 p-1 outline-none h-9"
              autoComplete="on"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label
            htmlFor="password"
            className="grid gap-1 text-sm text-gray-600 md:w-3/4 md:mx-auto lg:w-3/5 2xl:w-1/2"
          >
            <span className="text-gray-400">Password</span>
            <input
              type="password"
              id="password"
              className="border shadow-md rounded focus:ring-1 focus:ring-blue-500 p-1 outline-none h-9"
              autoComplete="on"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            type="button"
            className="justify-self-center py-1 px-2 rounded mt-2 text-md focus:outline-none focus:ring-1 focus:ring-red-200 active:ring-red-400 font-medium text-black text-opacity-60 2xl:text-opacity-70"
            onClick={signIn}
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default Home;

// export default function Home() {
//   const [session, loading] = useSession();
//   console.log(session);
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Create Next App</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       {!session && (
//         <>
//           Not signed in <br />
//           <button type="button" onClick={signIn}>
//             Sign In
//           </button>
//         </>
//       )}

//       {session && (
//         <>
//           Signed in as {session.user.name}: {session.user.email} <br />
//           <div>You can now access our super secret pages</div>
//           <button type="button" onClick={signOut}>
//             sign out
//           </button>
//         </>
//       )}

//     </div>
//   );
// }
