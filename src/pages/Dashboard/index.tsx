import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useIsLoading } from "~/hooks/loading";
import { If, Then, Else } from 'react-if';
import Loading from "../Loading";
import { useGetRegistrations, useRegistrations } from "~/hooks/registration";
import { useEffect } from "react";

const DashboardPage = () => {
  const getRegistrations = useGetRegistrations();

  const isLoading = useIsLoading();
  const registrations = useRegistrations();

  useEffect(() => {
    getRegistrations();
  }, [getRegistrations]);

  return (
    <If condition={isLoading}>
      <Then>
        <Loading />
      </Then>
      <Else>
        <S.Container>
          <SearchBar />
          <Collumns registrations={registrations} />
        </S.Container>
      </Else>
    </If>
  );
};
export default DashboardPage;
