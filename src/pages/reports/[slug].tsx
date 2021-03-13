import * as React from 'react';
import { NextPage } from 'next';
import { ReportDetail } from '../../components/ReportDetail';
import { Container } from '@material-ui/core';

const ReportIndex: NextPage = () => (
  <Container maxWidth={false} style={{ padding: 0 }}>
    <ReportDetail />
  </Container>
);

export default ReportIndex;
