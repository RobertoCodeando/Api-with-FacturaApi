import { useMemo } from 'react';
import styled, { Interpolation } from 'styled-components';
import { Title } from '../titles/Titles';
import { Box } from '../form/Form';

export type StylesCSS = Interpolation<React.CSSProperties>;
export type Styles = { styles?: StylesCSS };

export const StyledTable = styled.table<Styles>`
    width: 100%;
    border-collapse: collapse;
    ${({ styles }) => styles},
`;

export const THead = styled.thead<Styles>`
    width: 100%;
    ${({ styles }) => styles},
`;

export const TBody = styled.tbody``;

export const TR = styled.tr<Styles>`
    width: "100%";
    ${({ styles }) => styles},
`;

export const TableCell = styled.th<Styles>`
    color: #a2acaf;
    font-size: 14px;
    ${({ styles }) => styles},
`;

export const TD = styled.td<Styles>`
    width: "100%";
    font-size: 24px
    font-weight: bold
    ${({ styles }) => styles},
`;

export type CellProps = {
  props?: React.TableHTMLAttributes<any>;
  component?: React.ReactNode | string;
};

function Table({
  headers,
  rows,
  extraRow,
  onClickRow,
}: {
  headers: CellProps[];
  rows?: CellProps[][];
  extraRow?: { component: React.ReactNode; currentUser: number } | null;
  onClickRow?: (evt: any) => void;
}) {
  const headerTable = useMemo(
    () => headers
            && headers.map((header, index) => (
              <TableCell key={index}>
                <Title>{header.component ?? ''}</Title>
              </TableCell>
            )),
    [headers],
  );

  const tableBody = useMemo(
    () => rows!.map((row, index) => (
      <>
        <TR
          key={index}
          styles={{
            border: 'solid #a2acaf',
            borderWidth: '2px 0 2px 0',
            height: '50px',
          }}
          onClick={onClickRow}
        >
          {row.map((cell, indexRow) => (
            <TableCell key={indexRow}>
              {cell.component}
            </TableCell>
          ))}
        </TR>
        {extraRow && (index === extraRow.currentUser ? (
            <TR>
              <TableCell colSpan={6}>
                {extraRow.component}
              </TableCell>
            </TR>
        ) : null)}
      </>
    )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rows, extraRow],
  );

  return (
    <Box styles={{ padding: '3rem', width: 'unset' }}>
      <StyledTable>
        <THead>
          <TR>{headerTable}</TR>
        </THead>
        <TBody>{tableBody}</TBody>
      </StyledTable>
    </Box>
  );
}

export default Table;
