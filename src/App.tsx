import React from 'react';
import './App.css';
import {
  useGetContactsQuery,
  useGetOneContactQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} from './services/contactsApi';

function App() {
  const {
    data: contacts,
    error,
    isLoading,
    isFetching,
    isSuccess
  } = useGetContactsQuery();

  return (
    <div className="App">
      <h1>React Redux Toolkit Contact App</h1>
      {isLoading && <h2>...Loading</h2>}
      {isFetching && <h2>...Fetching</h2>}
      {error && <h2>Something went wrong. {JSON.stringify(error)}</h2>}
      {isSuccess && (
        <div>
          {contacts?.map(contact => {
            return <div className="data" key={contact.id}>
                <span>{ contact.name }</span>
                <span><ContactDetail id={ contact.id } /></span>
              </div>
          })}
        </div>
      )}
      <div><CreateContact /></div>
    </div>
  );
}

export const ContactDetail = ({ id } : { id:string }) => {
  const { data: contact } = useGetOneContactQuery(id);
  return (
    <pre>{ JSON.stringify(contact, undefined, 2) }</pre>
    )
  }
  
  export const CreateContact = () => {
    const [createContact] = useCreateContactMutation();
    const [updateContact] = useUpdateContactMutation();
    const [deleteContact] = useDeleteContactMutation();

  const contactToCreate = {
    'id': '9',
    'name': 'White Dragon',
    'email': 'white@dragon.com',
  }
  const contactToUpdate = {
    'id': '1',
    'name': 'Diety Link Hyrule',
    'email': 'dietylink@hyrule.com',
  }
  const contactToDelete = {
    'id': '4',
  }
  const createContactHandler = async () => {
    await createContact(contactToCreate);
  }
  const updateContactHandler = async () => {
    await updateContact(contactToUpdate);
  }
  const deleteContactHandler = async () => {
    await deleteContact(contactToDelete.id);
  }

  return (
    <>
      <button onClick={ createContactHandler }>Create Contact</button>
      <button onClick={ updateContactHandler }>Update Contact</button>
      <button onClick={ deleteContactHandler }>Delete Contact</button>
    </>
  )
}

export default App;
