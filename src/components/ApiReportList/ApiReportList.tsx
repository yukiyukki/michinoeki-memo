import * as React from 'react';
import { Table, TableBody, TableRow, TableCell, Link } from '@mui/material';
import NextLink from 'next/link';
import dayjs from 'dayjs';
import { Date as ParseDate } from 'prismic-reactjs';

interface Props {
  reports: any;
}

const ApiReportList: React.FC<Props> = ({ reports }) => {
  return (
    <Table>
      <TableBody>
        {reports.map((report, index) => {
          const lastUpdated = dayjs(ParseDate(report.last_publication_date));

          return (
            <TableRow key={index}>
              <TableCell>
                <NextLink href={`/reports/${report.uid}`}>
                  <Link>{report.data.place_name[0].text}</Link>
                </NextLink>
              </TableCell>
              <TableCell>{report.data.description[0].prefecture}</TableCell>
              <TableCell>
                更新日: {lastUpdated.format('YYYY/M/D(ddd)')}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export { ApiReportList };
