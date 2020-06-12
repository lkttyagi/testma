import { history } from '../_helpers/history';  

const url =""

export  const addCampaign =  (formdata) =>{
	console.log('form',formdata);
	return (dispatch,getState) =>{
		let headers={};
		let {token} = getState().auth;

		if(token) {
			headers["Authorization"] = `Token ${token}`;
		}
		
		 fetch (url+"create/",{headers,method:"POST" ,body:formdata})
			.then(res =>{
				if(res.status < 500){
					return res.json().then(data=>{
						return { status:res.status , data};
					})
				}
				else{
					console.log("Server Error");
					throw res;
				}
			})
			.then(res =>{
				if(res.status===201){
					dispatch({type:'ADD_CAMPAIGN',campaign:res.data});
					history.push('/profile');
					return res.data;
				}
				else if (res.status ===401 || res.status===403){
					dispatch({type:'AUTHENTICATION_ERROR',data:res.data});
					throw res.data;
				}
				else {
					dispatch({type:'CAMPAIGN_FAIL',data:res.data});
					throw res.data;
				}
			})
	}
}
export const getCampaigns =() =>{
	return(dispatch,getState)=>{
		let headers={};
		console.log(getState());
		let {token}= getState().auth;

		if(token){
			headers["Authorization"]=`Token ${token}`;
		}
		fetch(url+"create/",{headers,})
			/*.then(res =>{
				
				else{
					console.log("Server Error");
					throw res;
				}
			})*/
			.then(res =>{
				
				if(res.status===200){

					//dispatch({type:'FETCH_CAMPAIGN',campaign:res.data});
					
					res.json().then(data => { dispatch({type:'FETCH_CAMPAIGN',campaign:Array.from(data)}); });
					//return data;
					
					
				}
				else if (res.status ===401 || res.status===403){
					dispatch({type:'AUTHENTICATION_ERROR',data:res.data});
					throw res.data;
				}
				if(res.status<500){
					return res.json().then(data=>{
						
						return { status:res.data ,data};
					})
				}
			})
			.catch(function(error){
				throw error;
			})
	}
}


