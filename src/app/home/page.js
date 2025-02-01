'use client'

import React from 'react';
import { Button } from '@/components/ui/button';

function HomePage() {
  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    }}>
        <Button>
            Hello
        </Button>
    </div>
  )
}

export default HomePage