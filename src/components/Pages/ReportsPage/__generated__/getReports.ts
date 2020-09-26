/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getReports
// ====================================================

export interface getReports_allReports_edges_node_description {
  __typename: 'ReportDescription';
  prefecture: string | null;
  city: string | null;
}

export interface getReports_allReports_edges_node__meta {
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

export interface getReports_allReports_edges_node {
  __typename: 'Report';
  place_name: any | null;
  description: getReports_allReports_edges_node_description[] | null;
  _meta: getReports_allReports_edges_node__meta;
}

export interface getReports_allReports_edges {
  __typename: 'ReportConnectionEdge';
  /**
   * The item at the end of the edge.
   */
  node: getReports_allReports_edges_node;
}

export interface getReports_allReports {
  __typename: 'ReportConnectionConnection';
  /**
   * A list of edges.
   */
  edges: (getReports_allReports_edges | null)[] | null;
}

export interface getReports {
  allReports: getReports_allReports;
}
