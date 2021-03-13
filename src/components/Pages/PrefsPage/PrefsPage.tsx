import React from 'react';
import {
  Container,
  Divider,
  Typography,
  CircularProgress,
  Link,
  Grid,
} from '@material-ui/core';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@material-ui/core/styles';
import { Client } from '../../../apiClients/prismicClient';
import Prismic from 'prismic-javascript';
import ApiSearchResponse from 'prismic-javascript/types/ApiSearchResponse';
import { ApiReportList } from '../../ApiReportList';

const TitleTypography = styled(Typography)({
  marginTop: '80px',
  marginBottom: '40px',
});
const HeadTypography = styled(Typography)({
  marginTop: '40px',
  marginBottom: '40px',
});

const PrefsPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [reports, setReports] = useState<any>(null);
  const pref = String(router.query.pref);

  const fetchPrefReports = async (pref: string): Promise<ApiSearchResponse> => {
    return Client().query(
      Prismic.Predicates.at('my.report.description.prefecture', pref),
      { orderings: '[document.last_publication_date desc]' },
    );
  };

  useEffect(() => {
    if (pref === undefined) {
      return;
    }
    (async () => {
      if (pref === undefined) {
        return;
      }
      setLoading(true);
      const result = await fetchPrefReports(pref);
      setReports(result);
      setLoading(false);
    })();
  }, [pref]);

  if (loading || reports === null) {
    return (
      <Grid
        container
        justify="center"
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
        {pref}のレポート一覧
      </TitleTypography>
      <Divider />
      <ApiReportList reports={reports.results} />
      <HeadTypography variant="body1">
        <NextLink href="/">
          <Link>トップページ</Link>
        </NextLink>
      </HeadTypography>
    </Container>
  );
};

export { PrefsPage };
