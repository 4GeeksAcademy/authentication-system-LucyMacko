const getState = ({ getStore, setStore }) => {
	return {
		store: {
			message: null,
			user: sessionStorage.getItem('user'),
			token: sessionStorage.getItem('token'),
			idUser: sessionStorage.getItem('idUser'),
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			getMessage: async () => {
				try{					
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })					
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			syncTokenSessionStore: ()=> {
				const token = sessionStorage.getItem("token");
				const user = sessionStorage.getItem("user");
				const idUser = sessionStorage.getItem("idUser");
				if( token && token != "" && token != undefined){
					setStore({token: token, user: user, idUser: idUser})
				}
			},
			login: async (validation) => {
				try {
					console.log(validation);
					const resp = await fetch(process.env.BACKEND_URL + "/api/login",
						{
							method: "POST", 
							mode: "cors",
							headers: {
								"Content-Type": "application/json",								
							},
							body: JSON.stringify(validation)
						});
					const data = await resp.json();
					console.log(resp.status);
					if (resp.status != 200) return false;
					console.log(data);
					sessionStorage.setItem('token', data.token);
					sessionStorage.setItem('user', data.user);
					sessionStorage.setItem('idUser', data.idUser);
					setStore({ token: data.token, user: data.user, idUser: data.idUser });					
					return true;
				} catch (error) {
					console.log("Error loading message from backend", error);
					setStore({ token: null, user: null, idUser: null });
					sessionStorage.removeItem('token');
					sessionStorage.removeItem('user');
					sessionStorage.removeItem('idUser');
				}
			},

			logOut: () => {
				setStore({ token: null, user: null, idUser: null});
				sessionStorage.removeItem('token');
				sessionStorage.removeItem('user');
				sessionStorage.removeItem('idUser');
			},

			newUser: async (user) => {
				let data = "";
				console.log(user);
				const respUser = await fetch(process.env.BACKEND_URL + "/api/signup", {
					method: "POST",
					mode: "cors",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(user)
				})
				data = await respUser.json();
				console.log(respUser);
				if (respUser.status != 200) return false;
				return true;
			},

			goToPage: (toPage) => {
				const store = getStore();
				if (!store.token) {
					return "/login";
				}else{
					return toPage;
				}
			},
		}
	};
};

export default getState;
