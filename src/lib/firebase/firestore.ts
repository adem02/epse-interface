import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where, type DocumentData } from "firebase/firestore";
import { firestoreClient } from "./app";

export class FirestoreClient {
  static async createDocument<T extends DocumentData>(dbCollection: string, data: T): Promise<string | undefined> {
    const docRef = await addDoc(
      collection(firestoreClient, dbCollection),
      data as T
    );
    
    return docRef.id;
  }

  static async getDocumentById<T extends DocumentData>(dbCollection: string, id: string): Promise<T|null> {
    const docRef = doc(firestoreClient, dbCollection, id);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? {id: docSnap.id, ...docSnap.data() as T} : null;
  }

  static async getDocuments<T extends DocumentData>(dbCollection: string): Promise<T[]> {
    const querySnapshot = await getDocs(collection(firestoreClient, dbCollection));

    const documents: T[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() as T });
    });

    return documents;
  }

  static async getDocumentsByField<T extends DocumentData>(dbCollection: string, field: string, value: string): Promise<T[]> {
    const documentsQuery = query(collection(firestoreClient, dbCollection), where(field, "==", value));
    const querySnapshot = await getDocs(documentsQuery);

    const documents: T[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() as T });
    });

    return documents;
  }

  static async updateDocument<T extends DocumentData>(dbCollection: string, id: string, data: T): Promise<void> {
    const docRef = doc(firestoreClient, dbCollection, id);

    await updateDoc(docRef, data);
  }

  static async deleteDocument(dbCollection: string, id: string): Promise<void> {
    await deleteDoc(doc(firestoreClient, dbCollection, id));
  }
}
