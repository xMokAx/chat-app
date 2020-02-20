export function deleteCollection(
  db: FirebaseFirestore.Firestore,
  collectionPath: string,
  orderBy: string,
  batchSize: number
) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy(orderBy).limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, collectionPath, batchSize, resolve, reject);
  });
}

function deleteQueryBatch(
  db: FirebaseFirestore.Firestore,
  query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData>,
  collectionPath: string,
  batchSize: number,
  resolve: (value?: unknown) => void,
  reject: (reason?: any) => void
) {
  query
    .get()
    .then(snapshot => {
      // When there are no documents left, we are done
      if (snapshot.size === 0) {
        return 0;
      }

      // Delete documents in a batch
      const batch = db.batch();
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      return batch.commit().then(() => {
        return snapshot.size;
      });
    })
    .then(numDeleted => {
      console.log(`${numDeleted} docs were deleted from ${collectionPath}`);
      if (numDeleted === 0) {
        resolve();
        return;
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, query, collectionPath, batchSize, resolve, reject);
      });
    })
    .catch(reject);
}
