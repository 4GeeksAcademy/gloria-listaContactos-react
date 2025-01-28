const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
			],
			contacts: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			createAgenda: async(agenda_slug)=>{
				const response = await fetch(`${process.env.BACKEND_URL}/agendas/${agenda_slug}`, {method: "POST"})
				const data = await response.json()
				if(response.ok){
					console.log(data)
				}
			},

			getInfoContacts: async(agenda_slug)=>{
				const actions = getActions()
				const response = await fetch(`${process.env.BACKEND_URL}/agendas/${agenda_slug}/contacts`)
				const data = await response.json()
				if(response.status === 404){
					actions.createAgenda(process.env.AGENDA_SLUG)
				}
				if(response.ok){
					console.log(data)
					setStore({contacts: data.contacts})
				}
			},

			createContact: async(agenda_slug, newContact)=>{
				const store = getStore()
				const response = await fetch(`${process.env.BACKEND_URL}/agendas/${agenda_slug}/contacts`, {
					method: 'POST',
					body: JSON.stringify(newContact),
					headers: {'Content-Type': 'application/json'}
				})
				const data = await response.json()
			
				if(response.ok){
					console.log(data)
					setStore({contacts: store.contacts.concat(data)})
					return true
				}
			},

			deleteContact: async(agenda_slug, contact_id)=>{
				const store = getStore()
				const response = await fetch(`${process.env.BACKEND_URL}/agendas/${agenda_slug}/contacts/${contact_id}`, {
					method: 'DELETE',
				})
				const data = await response
				
				if(response.ok){
					console.log(data)
					setStore({contacts: store.contacts.filter(item => item.id != contact_id)})
					return true
				}
			},

			editContact: async(agenda_slug, updatedContact, contact_id)=>{
				const store = getStore()
				const response = await fetch(`${process.env.BACKEND_URL}/agendas/${agenda_slug}/contacts/${contact_id}`, {
					method: 'PUT',
					body: JSON.stringify(updatedContact),
					headers: {'Content-Type': 'application/json'}
				})
				const data = await response.json()
			
				if(response.ok){
					console.log(data)
					const updatedList = store.contacts.map(item=>{
						if(item.id == contact_id){
							item = data
						}
						return item
					})
					setStore({contacts: updatedList})
					return true
				}
			},
		}
	
	};
};

export default getState;
