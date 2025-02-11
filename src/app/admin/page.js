"use client";
import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Sidebar from "./components/Sidebar";
import DashboardHome from "./components/DashboardHome";
import EventsTable from "./components/EventsTable";
import PostsTable from "./components/PostsTable";
import AddEvent from "./components/AddEvent";
import AddPost from "./components/AddPost";
import AuthProvider from "../context/AuthProvider";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation"
import { signOut } from "next-auth/react";

const TABS = {
  DASHBOARD: "Dashboard",
  EVENTS: "Events",
  POSTS: "Posts",
  ADD_EVENT: "Add New Event",
  ADD_POST: "Add New Post",
};

const DashboardContent = () => {
  const [tab, setTab] = React.useState(TABS.DASHBOARD);
  
  const {data : session } = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect("/api/auth/signin?callbackUrl=/admin");
    },
  });

  React.useEffect(() => {
    if (session) {
        const logoutTimer = setTimeout(() => {
            signOut({ callbackUrl: '/' }); 
        }, 30 * 60 * 1000); 

        return () => clearTimeout(logoutTimer); 
    }
}, [session]);

  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      <Sidebar onSignOut={signOut} user={session?.user} TABS={TABS} tab={tab} onTabSelect={setTab} />
      <Box
        component="main"
        className="MainContent"
        sx={{
          px: { xs: 2, md: 6 },
          pt: {
            xs: "calc(12px + var(--Header-height))",
            sm: "calc(12px + var(--Header-height))",
            md: 3,
          },
          marginLeft: "var(--Sidebar-width)",
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          height: "100dvh",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            mb: 1,
            gap: 1,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "start", sm: "center" },
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Typography level="h2" component="h1">
            {tab}
          </Typography>
        </Box>
        {tab === TABS.DASHBOARD && <DashboardHome TABS={TABS} tab={tab} />}
        {tab === TABS.EVENTS && <EventsTable TABS={TABS} tab={tab} />}
        {tab === TABS.POSTS && <PostsTable TABS={TABS} tab={tab} />}
        {tab === TABS.ADD_EVENT && <AddEvent TABS={TABS} tab={tab} />}
        {tab === TABS.ADD_POST && <AddPost TABS={TABS} tab={tab} />}
      </Box>
    </Box>
  );
};

export default function Dashboard() {
  return (
    <CssVarsProvider
      defaultMode="system"
      modeStorageKey="midas-admin-theme" 
      disableTransitionOnChange
    >
      <CssBaseline />
      <AuthProvider>
        <DashboardContent />
      </AuthProvider>
    </CssVarsProvider>
  );
}
