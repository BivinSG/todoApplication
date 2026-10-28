import Layout from "./Layout";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const { auth } = useSelector((state) => state.authState);
  return <>{auth?.accessToken ? <Layout /> : <Navigate to="/login" />}</>;
}

export default App;
