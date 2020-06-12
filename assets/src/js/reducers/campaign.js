const initialState = {
	campaign:[],
	errors:{}
};

export default function campaign(state=initialState,action){
	

	switch(action.type){
		case 'ADD_CAMPAIGN':
			return {...state,campaign:action.campaign};
		case 'FETCH_CAMPAIGN':
			return {...state,campaign:action.campaign};
		case 'AUTHENTICATION_ERROR':
		case 'CAMPAIGN_FAIL':
			return {...state,errors:action.data,campaign:null};

		default:
			return state;
	}
}
