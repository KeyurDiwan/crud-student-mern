import React from 'react';

import {AppBar, Toolbar, Typography } from '@material-ui/core'

const Nav = () => {
  return (
      <AppBar position = 'absolute'>
          <Toolbar>
              <Typography variant="h5">
                    Students
              </Typography>

               <Typography variant="h5">
                    Login
              </Typography>

    
          </Toolbar>

      
    </AppBar>
  )
}

export default Nav