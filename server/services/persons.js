const COLLECTION_NAME = "collection_name";

const personsDbCollectionActions = (db) => {
  const addNewPerson = async (person) => {
    return await db.collection(COLLECTION_NAME).insertOne(person);
  };

  const getPerson = async (_id) => {
    return await db.collection(COLLECTION_NAME).findOne({ _id });
  };

  const deletePerson = async (_id) => {
    return await db.collection(COLLECTION_NAME).remove({ _id });
  };

  const updatePerson = async (_id, data) => {
    return await db.collection(COLLECTION_NAME).update({ _id }, data);
  };

  const getPersons = async () => {
    return await db
      .collection(COLLECTION_NAME)
      .find()
      .toArray();
  };

  return {
    addNewPerson,
    getPerson,
    deletePerson,
    updatePerson,
    getPersons,
  };
};

export { personsDbCollectionActions };
