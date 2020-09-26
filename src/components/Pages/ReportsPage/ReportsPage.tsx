import React from 'react';
import {
  Container,
  Divider,
  Typography,
  CircularProgress,
  Link,
} from '@material-ui/core';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import apiClient from '../../../apiClients/apiClient';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { getReports } from './__generated__/getReports';
import { ReportList } from '../../ReportList';

const TitleTypography = styled(Typography)({
  marginTop: '80px',
  marginBottom: '40px',
});
const HeadTypography = styled(Typography)({
  marginTop: '40px',
  marginBottom: '40px',
});

const ReportsPage: React.FC = () => {
  const fetchReports = async (): Promise<ApolloQueryResult<getReports>> => {
    return await apiClient.query({
      query: gql`
        query getReports {
          allReports(sortBy: meta_lastPublicationDate_DESC) {
            edges {
              node {
                place_name
                description {
                  prefecture
                  city
                }
                _meta {
                  uid
                  lastPublicationDate
                }
              }
            }
          }
        }
      `,
    });
  };

  const [reports, setReports] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const result = await fetchReports();
      setReports(result.data);
    })();
  }, []);

  if (reports === null || reports.allReports.edges.length === 0) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="sm">
      <TitleTypography variant="h3" align="center">
        レポート一覧
      </TitleTypography>
      <Divider />
      <ReportList reports={reports.allReports.edges} />
      <HeadTypography variant="body1">
        <NextLink href="/">
          <Link>トップページ</Link>
        </NextLink>
      </HeadTypography>
    </Container>
  );
};

export { ReportsPage };
