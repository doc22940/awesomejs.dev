import gql from 'graphql-tag'
import { Resolvers } from '@/generated/schema'

export const typeDefs = gql`
extend interface PackageInterface {
  dataSources: [PackageDataSource!]!
}

extend type Package {
  dataSources: [PackageDataSource!]!
}

extend type PackageProposal {
  dataSources: [PackageDataSource!]!
}

type PackageDataSource {
  type: String!
  data: JSON
}

input DataSourcesInput {
  github: GithubDataSourceInput
  npm: NpmDataSourceInput
}

input GithubDataSourceInput {
  owner: String!
  repo: String!
}

input NpmDataSourceInput {
  name: String!
}
`

export interface NpmDataSource {
  name: string
}

export interface GithubDataSource {
  owner: string
  repo: string
}

export interface PackageDataSources {
  npm: NpmDataSource
  github: GithubDataSource
}

export const resolvers: Resolvers = {
  PackageInterface: {
    dataSources: async (pkg) => {
      return Object.keys(pkg.dataSources || {}).map((key) => ({
        type: key,
        // @ts-ignore
        data: pkg.dataSources[key],
      }))
    },
  },
}
