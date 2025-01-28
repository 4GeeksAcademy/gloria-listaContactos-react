import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from "../store/appContext";


const AddContact = () => {

    const { store, actions } = useContext(Context)
    let navigate = useNavigate();
    const { id } = useParams(); //se obtine el id colocado en el layout

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    async function guardarContacto(e) {
        e.preventDefault()
        if (name.trim() == "" || phone.trim() == "" || email.trim() == "" || address.trim() == "") {
            alert("Empty fields")
            return null
        }
        const payload = {
            name: name,
            phone: phone,
            email: email,
            address: address
        };

        let result = null

        if (!id) {
            result = await actions.createContact(process.env.AGENDA_SLUG, payload)
            
        } else {
            result = await actions.editContact(process.env.AGENDA_SLUG, payload, id)
        }
        if(result){
            alert("Se grabo los datos del contacto");
            navigate('/')
        setName("");
        setPhone("");
        setEmail(""),
        setAddress("");
        }

    }

    useEffect(() => {
        if (id && store.contacts.length > 0) {
            const currentContact = store.contacts.find(contact => contact.id == id)
            setName(currentContact.name)
            setPhone(currentContact.phone)
            setEmail(currentContact.email)
            setAddress(currentContact.address)
        }
    }, [id, store.contacts])

    return (
        <div className="container bg-light">
            <h1 className="text-center">{!id ? "Agregar un nuevo contacto" : `Editando a: ${name}`}</h1>

            <form className="container" onSubmit={guardarContacto}>

                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput1" className="form-label">Nombre completo</label>
                    <input type="text" className="form-control" id="formGroupExampleInput1" placeholder="Nombre y apellido" onChange={(e) => setName(e.target.value)} value={name} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="correo electronico" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput3" className="form-label">Celular</label>
                    <input type="text" className="form-control" id="formGroupExampleInput3" placeholder="Numero celular" onChange={(e) => setPhone(e.target.value)} value={phone} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput4" className="form-label">Contraseña</label>
                    <input type="text" className="form-control" id="formGroupExampleInput4" placeholder="Ingresa contraseña" onChange={(e) => setAddress(e.target.value)} value={address} required />
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary" >Guardar</button>
                </div>
            </form>

            <Link to="/">Volver a lista de contactos</Link>
        </div>
    );


};
export default AddContact;
