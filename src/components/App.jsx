import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactsFilter } from './ContactsFilter/ContactsFilter';
import { ContactsList } from './ContactsList/ContactsList';

const LS_KEY = 'phoebook_contact';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem(LS_KEY)) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleAddNewContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevState => [contact, ...prevState]);
  };

  const handleSubmit = values => {
    const { name, number } = values;

    const existingName = contacts.some(
      item => item.name.toLowerCase() === name.toLowerCase()
    );
    const existingNumber = contacts.find(item => item.number === number);

    if (existingName) {
      return alert(`Contact "${name}" is already in contacts list`);
    } else if (existingNumber) {
      return alert(`Number "${number}" is already in contacts list`);
    }

    handleAddNewContact(name, number);
  };

  const handleDeleteContact = id => {
    setContacts(prevState => prevState.filter(item => item.id !== id));
  };

  const handleChangeFilter = evt => {
    setFilter({ filter: evt.currentTarget.value });
  };

  const getVisibleContacts = (() => {
    // const normalizedFilter = filter.toLowerCase();

    return contacts
      .filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
      .sort();
  })();

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />

      <h2>Contacts</h2>
      <ContactsFilter value={filter} onChange={handleChangeFilter} />
      <ContactsList
        contacts={getVisibleContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   // local storage

//   componentDidMount() {
//     const savedState = localStorage.getItem(LS_KEY);
//     if (savedState) {
//       this.setState({ contacts: JSON.parse(savedState) });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     const { contacts } = this.state;
//     if (prevState.contacts.length !== contacts.length) {
//       localStorage.setItem(LS_KEY, JSON.stringify(contacts));
//     }
//   }

//   handleSubmit = values => {
//     const { name, number } = values;
//     const { contacts } = this.state;

//     const existingName = contacts.some(item => item.name === name);
//     const existingNumber = contacts.find(item => item.number === number);

//     if (existingName) {
//       return alert(`Contact "${name}" is already in contacts list`);
//     } else if (existingNumber) {
//       return alert(`Number "${number}" is already in contacts list`);
//     }

//     this.handleAddNewContact(name, number);
//   };

//   handleAddNewContact = (name, number) => {
//     const contact = {
//       id: nanoid(),
//       name,
//       number,
//     };
//     this.setState(prevState => {
//       return { contacts: [contact, ...prevState.contacts] };
//     });
//   };

//   handleDeleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   handleChangeFilter = evt => {
//     this.setState({ filter: evt.currentTarget.value });
//   };

//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase(normalizedFilter))
//     );
//   };

//   render() {
//     const visibleContacts = this.getVisibleContacts();
//     return (
//       <div className={css.container}>
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={this.handleSubmit} />

//         <h2>Contacts</h2>
//         <ContactsFilter
//           value={this.state.filter}
//           onChange={this.handleChangeFilter}
//         />
//         <ContactsList
//           contacts={visibleContacts}
//           onDeleteContact={this.handleDeleteContact}
//         />
//       </div>
//     );
//   }
// }
