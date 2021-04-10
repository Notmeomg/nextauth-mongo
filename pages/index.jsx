import React from "react";
// import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/client";
// import Head from "next/head";
// import styles from "../styles/Home.module.css";

const Home = () => (
  <main className="container mx-auto border border-blue-400">
    <section className="grid gap-2 justify-start p-4">
      <input className="border border-gray-400" />
      <input className="border border-gray-400" />
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
