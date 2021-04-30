import React from "react";
import { useSession, getSession } from "next-auth/client";
import PropTypes from "prop-types";
import SignIn from "../components/SignIn";
import Dashboard from "../components/Dashboard";

export const getServerSideProps = async (context) => {
  const serverSession = await getSession(context);

  return {
    props: {
      serverSession,
    },
  };
};

const Home = ({ serverSession = null }) => {
  const [clientSession] = useSession();
  if (serverSession || clientSession) return <Dashboard />;
  return <SignIn />;
};

export default Home;

Home.propTypes = {
  serverSession: PropTypes.shape({}),
};
