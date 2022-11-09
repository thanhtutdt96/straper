import { useEffect, useState } from 'react';
import { database } from 'helpers/firebase';
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  Query,
  query,
  where,
} from '@firebase/firestore';
import { CollectionCondition, QueryCollectionMode } from 'types/Firestore';

type RecordType = Record<string, unknown> & {
  id?: string;
  uid?: string;
};

export default function useFirestore<DocumentType extends RecordType>(
  collectionName: string,
  condition?: CollectionCondition,
  queryCollectionMode: QueryCollectionMode = QueryCollectionMode.GET_REAL_TIME,
) {
  const [documents, setDocuments] = useState<DocumentType[]>([]);

  const getMultipleDocumentsBySearchTerm = (searchTerm: string) => {
    if (queryCollectionMode !== QueryCollectionMode.GET_ALL || !condition?.limit) {
      return;
    }

    const collectionRef = collection(database, collectionName);

    const dataQuery = query(
      collectionRef,
      where(condition.fieldName, condition.operator, searchTerm?.trim()?.toLowerCase()),
      orderBy(condition.orderBy || 'createdAt'),
      limit(condition.limit),
    );

    return getDocs(dataQuery);
  };

  useEffect(() => {
    if (queryCollectionMode !== QueryCollectionMode.GET_REAL_TIME) {
      return;
    }

    let dataQuery: Query;

    const collectionRef = collection(database, collectionName);

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }

      dataQuery = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue),
        orderBy(condition.orderBy || 'createdAt'),
      );
    } else {
      dataQuery = query(collectionRef, orderBy('createdAt'));
    }

    const unsubscribe = onSnapshot(dataQuery, (querySnapshot) => {
      const documents = querySnapshot.docs.map(
        (document) =>
          <DocumentType>{
            ...document.data(),
            id: document.id,
          },
      );

      setDocuments(documents);
    });

    return () => unsubscribe();
  }, [collectionName, condition, queryCollectionMode]);

  return {
    documents,
    getMultipleDocumentsBySearchTerm,
  };
}
