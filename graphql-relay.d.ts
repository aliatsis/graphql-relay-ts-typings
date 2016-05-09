import {
  GraphQLFieldConfig,
  GraphQLResolveInfo,
  GraphQLArgumentConfig,
  GraphQLFieldConfigMap,
  GraphQLObjectType,
  InputObjectConfigFieldMap,
  GraphQLInterfaceType,
  GraphQLInputType,
  GraphQLOutputType
} from "graphql";

// need to export all imported from graphql to avoid private reference errors during use
export {
GraphQLFieldConfig,
GraphQLResolveInfo,
GraphQLArgumentConfig,
GraphQLFieldConfigMap,
GraphQLObjectType,
InputObjectConfigFieldMap,
GraphQLInterfaceType,
GraphQLInputType,
GraphQLOutputType
}

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

export function mutationWithClientMutationId(config: MutationConfig): GraphQLFieldConfig;

export function nodeDefinitions(idFetcher: ((id: string, context: any, info: GraphQLResolveInfo) => any), typeResolver?: typeResolverFn): GraphQLNodeDefinitions;

export function fromGlobalId(globalId: string): ResolvedGlobalId;
export function globalIdField(typeName?: string, idFetcher?: (object: any, context: any, info: GraphQLResolveInfo) => string): GraphQLFieldConfig;
export function toGlobalId(type: string, id: string): string;

export function pluralIdentifyingRootField(config: PluralIdentifyingRootFieldConfig): GraphQLFieldConfig;

type ConnectionCursor = string;

interface ForwardConnectionArgs {
  after: GraphQLArgumentConfig;
  first: GraphQLArgumentConfig;
}

interface BackwardConnectionArgs {
  before: GraphQLArgumentConfig;
  last: GraphQLArgumentConfig;
}

interface ConnectionArgs {
  forwardConnectionArgs: ForwardConnectionArgs;
  backwardConnectionArgs: BackwardConnectionArgs;
}

interface ConnectionConfig {
  name?: string;
  nodeType: GraphQLObjectType;
  resolveNode?: Function;
  resolveCursor?: Function;
  edgeFields?: (() => GraphQLFieldConfigMap) | GraphQLFieldConfigMap;
  connectionFields?: (() => GraphQLFieldConfigMap) | GraphQLFieldConfigMap;
}

interface GraphQLConnectionDefinitions {
  edgeType: GraphQLObjectType;
  connectionType: GraphQLObjectType;
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

type mutationFnSync = (object: any, ctx: any, info: GraphQLResolveInfo) => any;
type mutationFnAsync = (object: any, ctx: any, info: GraphQLResolveInfo) => Promise<any>;
type mutationFn = mutationFnSync | mutationFnAsync;

interface MutationConfig {
  name: string;
  inputFields: InputObjectConfigFieldMap;
  outputFields: GraphQLFieldConfigMap;
  mutateAndGetPayload: mutationFn;
}

interface GraphQLNodeDefinitions {
  nodeInterface: GraphQLInterfaceType;
  nodeField: GraphQLFieldConfig;
}

type typeResolverFnSync = (object: any) => GraphQLObjectType;
type typeResolverFnAsync = (object: any) => Promise<GraphQLObjectType>;
type typeResolverFn = typeResolverFnSync | typeResolverFnAsync;

interface PluralIdentifyingRootFieldConfig {
  argName: string;
  inputType: GraphQLInputType;
  outputType: GraphQLOutputType;
  resolveSingleInput:
  (input: any, context: any, info: GraphQLResolveInfo) => any;
  description?: string;
}

interface ResolvedGlobalId {
  type: string;
  id: string;
}