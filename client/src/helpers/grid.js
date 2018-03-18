import React from 'react';
import Grid from 'material-ui/Grid';

// ===================
// Material UI Aliases
// ===================

const Row = (props) => (
  <Grid container {...props}></Grid>
);

const Col = (props) => (
  <Grid item {...props}></Grid>
);

// ===========
// Breakpoints
// ===========

const XS = 360;
const SM = 600;
const MD = 960;
const LG = 1280;
const XL = 1920;

const screen = {
  xxs: `(max-width: ${XS-1}px)`,

  xs: `@media (min-width: ${XS}px) and (max-width: ${SM-1}px)`,
  xsDown: `@media (max-width: ${SM-1}px)`,
  xsUp: `@media (min-width: ${XS}px)`,

  sm: `@media (min-width: ${SM}px) and (max-width: ${MD-1}px)`,
  smDown: `@media (max-width: ${MD-1}px)`,
  smUp: `@media (min-width: ${SM}px)`,

  md: `@media (min-width: ${MD}px) and (max-width: ${LG-1}px)`,
  mdDown: `@media (max-width: ${LG-1}px)`,
  mdUp: `@media (min-width: ${MD}px)`,

  lg: `@media (min-width: ${LG}px) and (max-width: ${XL-1}px)`,
  lgDown: `@media (max-width: ${XL-1}px)`,
  lgUp: `@media (min-width: ${LG}px)`,

  xl: `@media (min-width: ${XL}px)`,
}


// ============
// Grid helpers
// ============

const flexCenter = {
  display: 'flex',
  alignItems: 'center',
}
const col = (size) => {
  let defaultCol = {
    position: 'relative',
    float: 'left',
    boxSizing: 'border-box'
  }
  if ( typeof size === 'undefined')
    return {
      ...defaultCol
    }
  else
    return {
      ...defaultCol,
      width: size
    }
}

// =======
// Exports
// =======

export { Row, Col, col, screen, flexCenter }
