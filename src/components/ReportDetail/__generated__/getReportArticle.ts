/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getReportArticle
// ====================================================

export interface getReportArticle_allReports_edges_node_description_website_Report {
  __typename: 'Report' | 'Reports' | '_FileLink' | '_ImageLink';
}

export interface getReportArticle_allReports_edges_node_description_website__ExternalLink {
  __typename: '_ExternalLink';
  url: string;
}

export type getReportArticle_allReports_edges_node_description_website =
  | getReportArticle_allReports_edges_node_description_website_Report
  | getReportArticle_allReports_edges_node_description_website__ExternalLink;

export interface getReportArticle_allReports_edges_node_description {
  __typename: 'ReportDescription';
  website: getReportArticle_allReports_edges_node_description_website | null;
  ticket_image: any | null;
  prefecture: string | null;
  city: string | null;
  address: string | null;
  access: string | null;
  open_time: string | null;
  close_time: string | null;
  facilities: string | null;
  activities: string | null;
  restroom: string | null;
  memorial_ticket: string | null;
  other: string | null;
}

export interface getReportArticle_allReports_edges_node {
  __typename: 'Report';
  place_name: any | null;
  cover_picture: any | null;
  contents: any | null;
  description: getReportArticle_allReports_edges_node_description[] | null;
}

export interface getReportArticle_allReports_edges {
  __typename: 'ReportConnectionEdge';
  /**
   * The item at the end of the edge.
   */
  node: getReportArticle_allReports_edges_node;
}

export interface getReportArticle_allReports {
  __typename: 'ReportConnectionConnection';
  /**
   * A list of edges.
   */
  edges: (getReportArticle_allReports_edges | null)[] | null;
}

export interface getReportArticle {
  allReports: getReportArticle_allReports;
}

export interface getReportArticleVariables {
  uid: string;
}
