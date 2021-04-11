import React from "react";
// import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/client";
// import Head from "next/head";
// import styles from "../styles/Home.module.css";

const Home = () => (
  <main className="container mx-auto h-screen py-4">
    <section className="h-full grid justify-items-center items-start mt-16">
      <form className="grid gap-4 border border-red-100 p-8 rounded-2xl shadow-lg w-3/4 xl:w-1/2">
        <label htmlFor="username" className="grid gap-1 text-sm text-gray-600">
          <span className="text-gray-400">Username</span>
          <input
            type="text"
            id="username"
            className="border shadow-md rounded focus:ring-1 focus:ring-blue-500 p-1 outline-none h-9"
          />
        </label>
        <label htmlFor="password" className="grid gap-1 text-sm text-gray-600">
          <span className="text-gray-400">Password</span>
          <input
            type="text"
            id="password"
            className="border shadow-md rounded focus:ring-1 focus:ring-blue-500 p-1 outline-none h-9"
          />
        </label>
      </form>
    </section>
  </main>
);

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
