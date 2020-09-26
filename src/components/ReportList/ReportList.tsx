import * as React from 'react';
import { Table, TableBody, TableRow, TableCell, Link } from '@material-ui/core';
import NextLink from 'next/link';
import dayjs from 'dayjs';
import { Date as ParseDate } from 'prismic-reactjs';
import { getRecentReports_allReports_edges } from '../Pages/IndexPage/__generated__/getRecentReports';
import { getReports_allReports_edges } from '../Pages/ReportsPage/__generated__/getReports';

interface Props {
  reports:
    | (getReports_allReports_edges | getRecentReports_allReports_edges)[]
    | null;
}

const ReportList: React.FC<Props> = ({ reports }) => {
  return (
    <Table>
      <TableBody>
        {reports.map((report, index) => {
          const lastUpdated = dayjs(
            ParseDate(report.node._meta.lastPublicationDate),
          );

          return (
            <TableRow key={index}>
              <TableCell>
                <NextLink href={`/reports/${report.node._meta.uid}`}>
                  <Link>{report.node.place_name[0].text}</Link>
                </NextLink>
              </TableCell>
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

export { ReportList };
