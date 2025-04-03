import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { Layout } from "./Layout";
import { UserLayout } from "./UserLayout";

export const AppLayout = () => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  return isAuthenticated ? <UserLayout /> : <Layout />;
};
