// firestore snippets
import { getFirebase, Collection, Document } from "firestorter";

export async function addDocument(collection = "", form = {}) {
  try {
    const col = new Collection(collection);
    const doc = await col.add({
      ...form,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return doc;
  } catch (error) {
    throw {
      code: `${error?.code ?? "Error"}`,
      message: `${error?.message ?? "Error adding data"}`,
    };
  }
}

export async function updateDocument(
  collection = "",
  document = "",
  form = {}
) {
  try {
    const doc = new Document(`${collection}/${document}`);
    const res = await doc.set(
      {
        ...form,
        updatedAt: new Date(),
      },
      { merge: true }
    );
    return res;
  } catch (error) {
    throw {
      code: `${error?.code ?? "Error"}`,
      message: `${error?.message ?? "Error deleting data"}`,
    };
  }
}

export async function deleteDocument(document = "") {
  try {
    const doc = new Document("todos/akskladlkasd887asj");
    return await doc.delete();
  } catch (error) {
    throw {
      code: `${error?.code ?? "Error"}`,
      message: `${error?.message ?? "Error deleting data"}`,
    };
  }
}
