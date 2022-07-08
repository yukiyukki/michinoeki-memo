import React from 'react';
import {
  Container,
  Divider,
  Typography,
  CircularProgress,
  Link,
  Grid,
} from '@mui/material';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import apiClient from '../../../apiClients/apiClient';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { getReports } from './__generated__/getReports';
import { ReportList } from '../../ReportList';

const TitleTypography = styled(Typography)({
  marginTop: '40px',
  marginBottom: '20px',
  fontSize: '32px',
  fontWeight: 'bold',
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
          allReports(first: 300, sortBy: meta_lastPublicationDate_DESC) {
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
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: '100vh' }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Container maxWidth="sm">
      <TitleTypography variant="h3" align="center">
        すべてのレポート
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
