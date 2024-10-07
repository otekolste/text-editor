import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Updates IndexedDB with content of text editor
export const putDb = async (content) => {
  const jateDb = await openDB("jate", 1); // Opens DB
  const tx = jateDb.transaction("jate", "readwrite"); // Opens a transaction
  const store = tx.objectStore("jate"); // Grabs reference to the object store
  const request = store.put({ jate: content }); // Updates object store with the contents of the text editor
  const result = await request;
  console.log("Data saved to the database", result);
};

// Gets all content from IndexedDB
export const getDb = async () => {
  const jateDb = await openDB("jate", 1); // Opens DB
  const tx = jateDb.transaction("jate", "readonly"); // Opens transaction
  const store = tx.objectStore("jate"); // Grabs reference to the object store
  const request = store.getAll(); // Gets all information in object store
  const result = await request;
  console.log(result);
};

initdb();
