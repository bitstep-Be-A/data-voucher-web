import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { routes } from "../../../routes/path";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export const PostTabBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const tabValue = useMemo(() => {
    if (routes.search.re.test(pathname)) {
      return 0;
    }
    else if (routes.bookmark.re.test(pathname)) {
      return 1;
    }
    return 0;
  }, [pathname]);

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={tabValue} onChange={(event, newValue) => {
        if (newValue === 0) {
          navigate(routes.search.path); return;
        } else if (newValue === 1) {
          navigate(routes.bookmark.path); return;
        }
      }}>
        <Tab value={0} label="전체" />
        <Tab value={1} label="즐겨찾기" />
        {/* <Tab label="AI 추천" {...a11yProps(2)} /> */}
      </Tabs>
    </Box>
  )
}
