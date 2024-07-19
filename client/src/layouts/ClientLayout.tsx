import { Outlet } from "react-router-dom";
import Header from "src/components/Header";
import Loading from "src/components/Loading";
import { useLoading } from "src/contexts/loading";

function ClientLayout() {
  const { loading } = useLoading();

  return (
    <>
      <Loading isShow={loading} />
      <Header />
      <Outlet />
    </>
  );
}

export default ClientLayout;
