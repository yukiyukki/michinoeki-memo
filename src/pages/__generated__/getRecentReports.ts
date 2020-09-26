/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRecentReports
// ====================================================

export interface getRecentReports_allReports_edges_node_description {
  __typename: 'ReportDescription';
  prefecture: string | null;
  city: string | null;
}

export interface getRecentReports_allReports_edges_node__meta {
  __typename: 'Meta';
  /**
   * The uid of the document.
   */
  uid: string | null;
  /**
   * The last publication date of the document.
   */
  lastPublicationDate: any | null;
}

export interface getRecentReports_allReports_edges_node {
  __typename: 'Report';
  place_name: any | null;
  description: getRecentReports_allReports_edges_node_description[] | null;
  _meta: getRecentReports_allReports_edges_node__meta;
}

export interface getRecentReports_allReports_edges {
  __typename: 'ReportConnectionEdge';
  /**
   * The item at the end of the edge.
   */
  node: getRecentReports_allReports_edges_node;
}

export interface getRecentReports_allReports {
  __typename: 'ReportConnectionConnection';
  /**
   * A list of edges.
   */
  edges: (getRecentReports_allReports_edges | null)[] | null;
}

export interface getRecentReports {
  allReports: getRecentReports_allReports;
}
