const COLLECTION_NAME = "collection_name";

const personsDbCollectionActions = db => {
	const addNewPerson = async person => {
		return await db.collection(COLLECTION_NAME).insertOne(person);
	};

	return {
		addNewPerson
	};
};

module.exports = {
	personsDbCollectionActions
};
