import { WhereFilterOp } from '@firebase/firestore';

export enum CollectionName {
  USERS = 'users',
  ROOMS = 'rooms',
}

export type CollectionCondition = {
  fieldName: string;
  operator: WhereFilterOp;
  compareValue?: string | string[];
  orderBy?: string;
  limit?: number;
};

export enum QueryCollectionMode {
  GET_SINGLE = 'get-single',
  GET_ALL = 'get-all',
  GET_REAL_TIME = 'get-real-time',
}
