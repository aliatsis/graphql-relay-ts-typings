import * as graphql from "graphql";

export var forwardConnectionArgs: ForwardConnectionArgs;
export var backwardConnectionArgs: BackwardConnectionArgs;
export var connectionArgs: ConnectionArgs;

export function connectionDefinitions(config: ConnectionConfig): GraphQLConnectionDefinitions;

export function connectionFromArray<T>(data: T[], args: ConnectionArguments): Connection<T>;
export function connectionFromArraySlice<T>(arraySlice: T[], args: ConnectionArguments, meta: ArraySliceMetaInfo): Connection<T>;
export function connectionFromPromisedArray<T>(dataPromise: Promise<T[]>, args: ConnectionArguments): Promise<Connection<T>>;
export function connectionFromPromisedArraySlice<T>(dataPromise: Promise<T[]>, args: ConnectionArguments, arrayInfo: ArraySliceMetaInfo): Promise<Connection<T>>;

export function cursorForObjectInConnection<T>(data: T[], object: T): ConnectionCursor;
export function cursorToOffset(cursor: ConnectionCursor): number;
export function getOffsetWithDefault(cursor: ConnectionCursor, defaultOffset: number): number;
export function offsetToCursor(offset: number): ConnectionCursor;

export function mutationWithClientMutationId(config: MutationConfig): graphql.GraphQLFieldConfig;

export function nodeDefinitions(idFetcher: ((id: string, context: any, info: graphql.GraphQLResolveInfo) => any), typeResolver?: typeResolverFn): GraphQLNodeDefinitions;

export function fromGlobalId(globalId: string): ResolvedGlobalId;
export function globalIdField(typeName?: string, idFetcher?: (object: any, context: any, info: graphql.GraphQLResolveInfo) => string): graphql.GraphQLFieldConfig;
export function toGlobalId(type: string, id: string): string;

export function pluralIdentifyingRootField(config: PluralIdentifyingRootFieldConfig): graphql.GraphQLFieldConfig;

type ConnectionCursor = string;

interface ForwardConnectionArgs {
  after: graphql.GraphQLArgumentConfig;
  first: graphql.GraphQLArgumentConfig;
}

interface BackwardConnectionArgs {
  before: graphql.GraphQLArgumentConfig;
  last: graphql.GraphQLArgumentConfig;
}

interface ConnectionArgs {
  forwardConnectionArgs: ForwardConnectionArgs;
  backwardConnectionArgs: BackwardConnectionArgs;
}

interface ConnectionConfig {
  name?: string;
  nodeType: graphql.GraphQLObjectType;
  resolveNode?: Function;
  resolveCursor?: Function;
  edgeFields?: (() => graphql.GraphQLFieldConfigMap) | graphql.GraphQLFieldConfigMap;
  connectionFields?: (() => graphql.GraphQLFieldConfigMap) | graphql.GraphQLFieldConfigMap;
}

interface GraphQLConnectionDefinitions {
  edgeType: graphql.GraphQLObjectType;
  connectionType: graphql.GraphQLObjectType;
}

interface PageInfo {
  startCursor: ConnectionCursor;
  endCursor: ConnectionCursor;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface Connection<T> {
  edges: Edge<T>[];
  pageInfo: PageInfo;
}

interface Edge<T> {
  node: T;
  cursor: ConnectionCursor;
}

interface ConnectionArguments {
  before?: ConnectionCursor;
  after?: ConnectionCursor;
  first?: number;
  last?: number;
}

interface ArraySliceMetaInfo {
  sliceStart: number;
  arrayLength: number;
}

type mutationFnSync = (object: any, ctx: any, info: graphql.GraphQLResolveInfo) => any;
type mutationFnAsync = (object: any, ctx: any, info: graphql.GraphQLResolveInfo) => Promise<any>;
type mutationFn = mutationFnSync | mutationFnAsync;

interface MutationConfig {
  name: string;
  inputFields: graphql.InputObjectConfigFieldMap;
  outputFields: graphql.GraphQLFieldConfigMap;
  mutateAndGetPayload: mutationFn;
}

interface GraphQLNodeDefinitions {
  nodeInterface: graphql.GraphQLInterfaceType;
  nodeField: graphql.GraphQLFieldConfig;
}

type typeResolverFnSync = (object: any) => graphql.GraphQLObjectType;
type typeResolverFnAsync = (object: any) => Promise<graphql.GraphQLObjectType>;
type typeResolverFn = typeResolverFnSync | typeResolverFnAsync;

interface PluralIdentifyingRootFieldConfig {
  argName: string;
  inputType: graphql.GraphQLInputType;
  outputType: graphql.GraphQLOutputType;
  resolveSingleInput:
  (input: any, context: any, info: graphql.GraphQLResolveInfo) => any;
  description?: string;
}

interface ResolvedGlobalId {
  type: string;
  id: string;
}