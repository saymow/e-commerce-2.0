import React from "react";
import styled from "styled-components";
import { CustomFC } from "../../@types";
import Layout from "../../components/core/Layout";
import ProfileDetails from "../../components/profile/ProfileDetails";
import ProfileLayout from "../../components/profile/ProfileLayout";

const Container = styled.div``;

const Profile: CustomFC = () => {
  return (
    <Layout>
      <ProfileLayout>
        <ProfileDetails />
      </ProfileLayout>
    </Layout>
  );
};

Profile.restrictVisibility = "private";

export default Profile;
