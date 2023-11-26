import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import { Wraper, Header } from './App.styled';

const contactsKey = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = window.localStorage.getItem(contactsKey);
    if (savedContacts !== null) {
      return JSON.parse(savedContacts);
    } else {
      return [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ];
    }
  });

  const [filter, setfilter] = useState('');

  const visibleContacts = contacts.filter(contact => {
    const hasFilteredName = contact.name && contact.name
      .toLowerCase()
      .includes(filter.toLowerCase());

    return hasFilteredName;
  });

  useEffect(() => {
    window.localStorage.setItem(contactsKey, JSON.stringify(contacts));
  }, [contacts]);

 const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
  };

const  addContact = newContact => {
    if (contacts.some(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts.`);
    } else {
      const contact = { ...newContact, id: nanoid() };
      setContacts(prevCont => [...prevCont, contact]);
    }
  };

  const setFilter = newSearch => {
    setfilter(newSearch);
  };

    return (
      <Wraper>
        <Header>Phonebook</Header>
        <ContactForm onSubmitForm={addContact} />

        <h2>Contacts</h2>
        <Filter
          onSetFilter={setFilter}
          value={filter}
        />
        <ContactList
          filtredContacts={visibleContacts}
          onDelete={deleteContact}
        />
      </Wraper>
    );
};