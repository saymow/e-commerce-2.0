import React from "react";
import styled from "styled-components";
import { CustomFC } from "../@types";
import Layout from "../components/core/Layout";

const Container = styled.div``;

const Profile: CustomFC = () => {
  return (
    <Layout>
      <Container></Container>
    </Layout>
  );
};

Profile.restrictVisibility = "private";

export default Profile;
