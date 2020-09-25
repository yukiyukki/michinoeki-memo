import React from 'react';
import { Container, Divider, Typography, Link } from '@material-ui/core';
import NextLink from 'next/link';
import { styled } from '@material-ui/core/styles';

const HeadTypography = styled(Typography)({
  marginTop: '120px',
});

const DescTypography = styled(Typography)({
  marginTop: '40px',
  marginBottom: '40px',
});

const Subtitle = styled(Typography)({
  marginTop: '40px',
});

const Index = () => (
  <Container maxWidth="sm">
    <HeadTypography variant="h2" align="center">
      soriの道の駅メモ
    </HeadTypography>
    <DescTypography>
      このspaceはsoriが行った道の駅の記録をつけておく場所です。
      <br />
      マイペースに書いていきます。
    </DescTypography>
    <Divider />
    <Subtitle variant="h4">最近の道の駅レポート</Subtitle>

    <Typography variant="body1">
      <Link component={NextLink} href="/reports">
        レポート一覧へ
      </Link>
    </Typography>
  </Container>
);

export default Index;
