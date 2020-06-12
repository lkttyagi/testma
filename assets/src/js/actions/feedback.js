const url ="http://localhost:8000/"

export const getFeedback=(id)=>{
	return(dispatch,getState)=>{

		let headers={};
		console.log(getState());
		let {token} = getState().auth;

		if(token){
			headers['Authorization']=`Token ${token}`;
		}
		fetch(url+`campaignCharts/api/chartsData/?campaign_id=${id}`,{headers,})

		.then(res =>{
			if(res.status ===200){
				//console.log(res.json());
				//dispatch({type:'FETCH_CHART',feedback:res.data});
				//return res.data;
				//res.json().then(data =>{dispatch({type:'FETCH_CHART',feedback:data});}
				res.json().then(data=>{
					dispatch({type:'FETCH_CHART',feedback:data});
					console.log("this is response",data);
					//return res.data;
				})
				

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