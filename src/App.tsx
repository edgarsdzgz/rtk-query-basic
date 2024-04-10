import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { useGetContactsQuery, useGetOneContactQuery } from './services/contactsApi';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

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
    </div>
  );
}

export const ContactDetail = ({ id } : { id:string }) => {
  const { data: contact } = useGetOneContactQuery(id);

  return (
    <pre>{ JSON.stringify(contact, undefined, 2) }</pre>
  )
}

export default App;
