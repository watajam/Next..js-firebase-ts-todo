import { Header } from "../../components/header";
import { Layout } from "../../components/Layout";
import { Todos as Tasks } from "../../components/tasks";

const Todos = () => {
  return (
    <>
      <Header>Task Item</Header>
      <Layout>
        <Tasks />
      </Layout>
    </>
  );
};

export default Todos;
