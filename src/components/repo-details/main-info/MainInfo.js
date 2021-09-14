import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function MainInfo(props) {
    return (
        <Grid container>
            <Grid item xs={9}>
                left panel
            </Grid>
            <Grid item xs={3}>
                {props.children}
            </Grid>
        </Grid>
    );
}