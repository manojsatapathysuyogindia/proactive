import  { useEffect, useState } from 'react';
import ThemeOptionContext from '.';
import { useApiRoutes } from "../../constants/apiRoutes";
import { useThemeOptionMutation } from "../../apihooks/useUsers"; // Changed import name
// import {useApiRoutes} from "../../constants/apiRoutes";

const ThemeOptionProvider = (props:any) => {
  const { GETSLUG } = useApiRoutes();
  const [themeOption, setThemeOption] = useState({});
// const =commonRoutes();
  // Renamed the mutation function to avoid naming conflict with import
  const { mutateAsync: fetchThemeOption, isPending: isFetching } = useThemeOptionMutation();

  const getThemeOptionApi = async () => {
    try {
      const data = await fetchThemeOption({
        URL: `${GETSLUG}/logo`,
      });

      if (data?.status === "Success") {
        setThemeOption(data?.data);
      } else {
        console.error("Failed to fetch theme options");
      }
    } catch (err) {
      console.error("Error fetching theme options:", err);
    }
  };
  
  useEffect(() => {
    getThemeOptionApi();
  }, []);

  return (
    <ThemeOptionContext.Provider
      value={{ 
        themeOption, 
        refetchThemeOptions: getThemeOptionApi,
        isFetching
      }}>
      {props.children}
    </ThemeOptionContext.Provider>
  );
};

export default ThemeOptionProvider;