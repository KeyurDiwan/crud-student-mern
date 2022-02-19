import React from 'react';

import {AppBar, Toolbar, Typography } from '@material-ui/core'

const Nav = () => {
  return (
      <AppBar position = 'static'>
          <Toolbar>
              <Typography variant="h5">
                    Students
              </Typography>
          </Toolbar>
    </AppBar>
  )
}

export default Nav