import React from 'react';
import { Box, Typography } from '@mui/material';
import Sheet from '@mui/joy/Sheet';
import { useColorScheme } from '@mui/joy/styles';

export default function DashboardHome() {
  const { mode } = useColorScheme(); 

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
        backgroundColor: mode === 'dark' ? '#121212' : '#f9fafb',
      }}
    >

      <Sheet
        sx={{
          width: '100%', 
          maxWidth: '100%', 
          height: '100%', 
          p: { xs: 4, sm: 6, md: 8 }, 
          borderRadius: 0, 
          boxShadow: mode === 'dark' ? 'none' : '0px 4px 20px rgba(0, 0, 0, 0.1)', 
          backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff', 
          textAlign: 'center', 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >

        <Typography
          variant="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: mode === 'dark' ? '#bb86fc' : '#1976d2',
          }}
        >
          Welcome to Your Dashboard!
        </Typography>

        <Typography
          variant="h2"
          gutterBottom
          sx={{
            color: mode === 'dark' ? '#e0e0e0' : '#555555', 
          }}
        >
          Please select a tab from the sidebar to view and edit:
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2, 
            mt: 4, 
          }}
        >

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              backgroundColor: mode === 'dark' ? '#333333' : '#fff3e0', 
              borderRadius: 2,
              boxShadow: mode === 'dark' ? 'none' : '0px 2px 8px rgba(0, 0, 0, 0.05)', 
            }}
          >
            <Typography
              variant="h2"
              sx={{
                width: '800px',
                fontWeight: 'bold',
                color: mode === 'dark' ? '#ffab40' : '#f57c00', 
              }}
            >
              📅 Events
            </Typography>
          </Box>

         
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              backgroundColor: mode === 'dark' ? '#2c2c2c' : '#e3f2fd', 
              borderRadius: 2,
              boxShadow: mode === 'dark' ? 'none' : '0px 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                width: '800px',
                fontWeight: 'bold',
                color: mode === 'dark' ? '#64b5f6' : '#1e88e5', 
              }}
            >
              📝 Posts
            </Typography>
          </Box>

          
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              backgroundColor: mode === 'dark' ? '#3a3a3a' : '#f3e5f5', 
              borderRadius: 2,
              boxShadow: mode === 'dark' ? 'none' : '0px 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                width: '800px',
                fontWeight: 'bold',
                color: mode === 'dark' ? '#ba68c8' : '#ab47bc', 
              }}
            >
              📷 Media
            </Typography>
          </Box>
        </Box>
      </Sheet>
    </Box>
  );
}