import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const styles = makeStyles((theme) =>
    createStyles({
        root: {
          ...theme.mixins.gutters(),
          paddingTop: theme.spacing(1) * 2,
          paddingBottom: theme.spacing(1) * 2,
          backgroundColor: theme.palette.primary.main,
        },
        footer: {
          paddingTop: `${theme.spacing(1) * 5}px`,
        },
        whiteText: {
          color: '#fff'
        }
    }),
);

export default function Footer() {
  const classes = styles();

  return (
    <footer className={classes.footer}>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="body2" className={classes.whiteText} align="center">
        {`© ${new Date().getFullYear()} Copyright: `}
        <Link color="inherit" href="https://github.com/akotadi/" target="_blank" rel="noopener">
            Akotadi
        </Link>
        </Typography>
      </Paper>
    </footer>
  );
}