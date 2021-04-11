import React from "react";

export const getServerSideProps = async (context) => {
  console.log(context);
  console.log("query server db");

  const { user } = context.query;

  if (user !== "true")
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {},
  };
};

const Dashboard = () => {
  console.log("dashboard loaded");
  const isLoggedIn = false;

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <h2>Thanks for stopping by</h2>
    </div>
  );
};

export default Dashboard;
