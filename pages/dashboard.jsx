import React from "react";
import { getSession } from "next-auth/client";
import PropTypes from "prop-types";
import DashboardLayout from "../components/DashboardLayout";

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: { user: session.user },
  };
};

const Dashboard = ({ user }) => {
  const { username } = user;
  return (
    <DashboardLayout>
      <div>
        <h1>
          Welcome to the Dashboard{" "}
          <span className="capitalize">{username}</span>
        </h1>
        <h2>Thanks for stopping by</h2>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

Dashboard.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
};
