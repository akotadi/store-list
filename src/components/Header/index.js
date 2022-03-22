import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  navIcon: {
    marginRight: theme.spacing(2),
    width: '30px',
  },
  navText: {
    color: '#fff',
    left: '50%',
    marginLeft: '-50px',
    position: 'absolute',
    fontWeight: 'bold',
  },
}));

export default function Header() {
  const classes = useStyles();
  
  return (
    <AppBar position="relative">
      <Toolbar>
        <img className={classes.navIcon} src="./assets/layout/images/Logo-cremeria.svg" alt="Cremería Gustavo"/>
        <Typography variant="h6" className={classes.navText} noWrap>
          Lista de Precios
        </Typography>
      </Toolbar>
    </AppBar>
  );
}