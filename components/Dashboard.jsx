import React from "react";
import { useSession } from "next-auth/client";
import Layout from "./Layout";

const Dashboard = () => {
  const [session] = useSession();
  return (
    <main>
      <Layout>
        <div>
          <h1>
            Welcome to the Dashboard{" "}
            <span className="capitalize">{session?.user.username}</span>
          </h1>
          <h2>Thanks for stopping by</h2>
        </div>
      </Layout>
    </main>
  );
};

export default Dashboard;
