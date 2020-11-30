import React from "react";
import { CustomFC } from "../../@types";
import Layout from "../../components/core/Layout";
import ProfileAddreses from "../../components/profile/ProfileAddresses";
import ProfileLayout from "../../components/profile/ProfileLayout";

const Profile: CustomFC = () => {
  return (
    <Layout>
      <ProfileLayout>
        <ProfileAddreses />
      </ProfileLayout>
    </Layout>
  );
};

Profile.restrictVisibility = "private";

export default Profile;
