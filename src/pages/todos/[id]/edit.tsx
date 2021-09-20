import React from "react";

import { Edit } from "../../../components/edit";
import { Header } from "../../../components/header";
import { Layout } from "../../../components/Layout";

const edit = () => {
  return (
    <>
      <Header>Edit screen</Header>
      <Layout>
        <Edit />
      </Layout>
    </>
  );
};

export default edit;
