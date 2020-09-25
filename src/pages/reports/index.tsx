import React from 'react';
import { Container, Divider, Typography, Link } from '@material-ui/core';
import NextLink from 'next/link';
import { styled } from '@material-ui/core/styles';

const HeadTypography = styled(Typography)({
  marginTop: '120px',
});

const ReportIndex = () => (
  <Container maxWidth="sm">
    <HeadTypography variant="h3" align="center">
      レポート一覧
    </HeadTypography>
    <Divider />

    <Typography variant="body1">
      <Link component={NextLink} href="/">
        トップページ
      </Link>
    </Typography>
  </Container>
);

export default ReportIndex;
