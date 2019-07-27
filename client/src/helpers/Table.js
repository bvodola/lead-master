import React from 'react';
import Radium from 'radium';
import { merge, getNested } from './';
import { screen, col, flexCenter } from './grid';
import Text from './Text';

const cellStyle = {
  display: 'table-cell',
  verticalAlign: 'middle',
  padding: '8px',
};

const style = {
  // ...col('100%'),
  width: '100%',
  display: 'table',
  borderCollapse: 'collapse',
  fontFamily: 'Roboto',
  fontSize: '0.875rem',

  header: {
    [screen.xsDown]: {
      display: 'none',
    },
    display: 'table-row',
    textAlign: 'left',
    borderBottom: '1px solid #eee',

    cell: {
      display: 'table-cell',
      verticalAlign: 'middle',
      padding: '16px 8px',
      fontWeight: 'bold',
      text: {
        fontWeight: 'bold'
      }
    }
  },

  row: {
    display: 'table-row',
    borderBottom: '1px solid #eee',
  },
  stackedCell: {
    ...cellStyle,
    [screen.xsDown]: {
      padding: '0px 8px',
      ...col('100%'),
    }
  },
  inlineCell: {
    ...cellStyle,
    [screen.xsDown]: {
      ...col(),
      padding: '0 0 0 8px',
      width: 'auto',

    }
  },
  cell: {
    ...cellStyle,
    [screen.xsDown]: {
      position: 'relative',
    }
  }
}

const noStyle = {};

const RawTable = (props) => {

  const headerStyle = merge(style.header, getNested(props, 'style.header'));
  const cellStyle = merge(style.header.cell, getNested(props, 'style.header.cell'));
  const textStyle = merge(style.header.cell.text, getNested(props, 'style.header.cell.text'));
  

  return (
    <div style={{ ...style, ...(props.style || noStyle )}}>
      {props.header?
        <div style={headerStyle}>
          {props.header.map((v,i) =>(
            <div style={cellStyle} key={i}>
              <Text style={textStyle}>{v}</Text>
            </div>
          ))}
        </div>
        :''
      }
      {props.children}
    </div>
  );
}
const RawTr = (props) => (
  <div onClick={props.onClick} style={{...style.row , ...(props.style || noStyle)}}>
    {props.children}
  </div>
);

const RawTd = (props) => {
  const { stackable, inline } = props;
  let tdStyle;

  if(stackable) {
    tdStyle = style.stackedCell
  } else if(inline) {
    tdStyle = style.inlineCell
  } else {
    tdStyle = style.cell;
  }

  return(
    <div style={{ ...tdStyle , ...(props.style || noStyle) }}>
      {props.children}
    </div>
  );
}


const Table = Radium(RawTable);
const Tr = Radium(RawTr)
const Td = Radium(RawTd);

export { Table, Tr, Td };
