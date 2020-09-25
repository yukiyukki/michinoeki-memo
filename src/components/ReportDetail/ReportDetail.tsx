import * as React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Divider, Typography, Link } from '@material-ui/core';
import NextLink from 'next/link';
import { styled } from '@material-ui/core/styles';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  currentReportUidState,
  currentReportQuery,
} from '../../store/currentReportQuery';

const HeadTypography = styled(Typography)({
  marginTop: '120px',
});

const ReportDetail: React.FC = () => {
  const router = useRouter();
  const setSlug = useSetRecoilState(currentReportUidState);
  const currentReport = useRecoilValue(currentReportQuery);
  console.log(currentReport);

  useEffect(() => {
    if (router.query.slug[0]) {
      setSlug(router.query.slug[0]);
    }
  }, []);

  return (
    <React.Fragment>
      <HeadTypography variant="h2" align="center">
        レポート一覧
      </HeadTypography>
      <Divider />

      <Typography variant="body1">
        <Link component={NextLink} href="/">
          トップページ
        </Link>
      </Typography>
    </React.Fragment>
  );
};

export { ReportDetail };
