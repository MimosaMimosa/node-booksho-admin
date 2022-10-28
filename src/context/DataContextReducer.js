const DataContextReducer = (state, action) => {
	switch (action.type) {
		case "STORE_AUTHORS":
			return { ...state, authors: action.authors };
		case "CREATE_AUTHORS":
			return { ...state, authors: action.authors };
		case "STORE_BOOKS":
			return { ...state, books: action.books };
		default:
			return state;
	}
};

export default DataContextReducer;
