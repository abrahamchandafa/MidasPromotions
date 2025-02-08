"use client"
import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

import Sidebar from './components/Sidebar';
import EventsTable from './components/EventsTable';
import PostsTable from './components/PostsTable';
import MediaTable from './components/MediaTable';
import DashboardHome from './components/DashboardHome';

const TABS = {
    DASHBOARD: 'Dashboard',    
    EVENTS: 'Events',
    POSTS: 'Posts',
    MEDIA: 'Media',
}



export default function Dashboard() {
    const [tab, setTab] = React.useState(TABS.DASHBOARD);
    
    function onTabSelect(tab) {
        setTab(tab);
    }

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Sidebar TABS={TABS} tab={tab} onTabSelect={onTabSelect} />
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          }}
        >
         
          <Box
            sx={{
              display: 'flex',
              mb: 1,
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="h2" component="h1">
              {tab}
            </Typography>
          </Box>
          {tab === TABS.DASHBOARD && <DashboardHome TABS={TABS} tab={tab}  />}
            {tab === TABS.EVENTS && <EventsTable TABS={TABS} tab={tab}  />}
            {tab === TABS.POSTS && <PostsTable TABS={TABS} tab={tab}  />}
            {tab === TABS.MEDIA && <MediaTable TABS={TABS} tab={tab}  />}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}