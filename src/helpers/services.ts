import { database } from 'helpers/firebase';
import { addDoc, collection } from '@firebase/firestore';

export const addDocument = async (collectionName: string, data: Record<string, unknown>) => {
  try {
    const docRef = await addDoc(collection(database, collectionName), {
      ...data,
    });

    console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
