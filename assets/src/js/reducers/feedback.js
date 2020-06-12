const initialState=[];

export default function feedback(state=initialState,action){
	switch(action.type){
		case 'FETCH_CHART':
			return [...state,action.feedback];
		default:
			return state;
	}
}