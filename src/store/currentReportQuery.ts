import { atom, selector } from 'recoil';
import apiClient from '../apiClients/apiClient';
import gql from 'graphql-tag';

export const currentReportUidState = atom<string | null>({
  key: 'CurrentReportId',
  default: null,
});

export const currentReportQuery = selector({
  key: 'CurrentReport',
  get: async ({ get }) => {
    const reportUid = get(currentReportUidState);
    if (reportUid === null) {
      return null;
    }

    const response = await apiClient.query({
      query: gql`
          {
            allReports(uid: "${reportUid}") {
              edges {
                node {
                  place_name
                }
              }
            }
          }
        `,
    });

    return response.data;
  },
});
