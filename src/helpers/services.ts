import { database } from 'helpers/firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from '@firebase/firestore';

export const addDocument = (collectionName: string, data: Record<string, unknown>) => {
  return addDoc(collection(database, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const updateDocument = (
  documentId: string,
  collectionName: string,
  data: Partial<unknown>,
) => {
  const documentRef = doc(database, collectionName, documentId);

  return updateDoc(documentRef, data);
};

// generate keywords for displayName, using for full text search
export const generateKeywords = (displayName: string) => {
  const nameArray = displayName.split(' ').filter((word) => word);

  const length = nameArray.length;

  const flagArray: boolean[] = [];
  const result: string[] = [];
  const stringArray: string[] = [];

  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }

  const createKeywords = (name: string) => {
    const arrName: string[] = [];
    let currentName = '';

    name.split('').forEach((letter) => {
      currentName += letter;
      arrName.push(currentName);
    });

    return arrName;
  };

  function findPermutation(k: number) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true;
        result[k] = nameArray[i];

        if (k === length - 1) {
          stringArray.push(result.join(' '));
        }

        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }

  findPermutation(0);

  return stringArray.reduce((acc: string[], cur) => {
    const words = createKeywords(cur);

    return [...acc, ...words];
  }, []);
};
