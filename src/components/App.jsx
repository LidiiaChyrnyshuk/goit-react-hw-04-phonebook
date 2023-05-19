import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactsFilter } from './ContactsFilter/ContactsFilter';
import { ContactsList } from './ContactsList/ContactsList';

const LS_KEY = 'phoebook_contact';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  // local storage

  componentDidMount() {
    const savedState = localStorage.getItem(LS_KEY);
    if (savedState) {
      this.setState({ contacts: JSON.parse(savedState) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem(LS_KEY, JSON.stringify(contacts));
    }
  }

  handleSubmit = values => {
    const { name, number } = values;
    const { contacts } = this.state;

    const existingName = contacts.some(item => item.name === name);
    const existingNumber = contacts.find(item => item.number === number);

    if (existingName) {
      return alert(`Contact "${name}" is already in contacts list`);
    } else if (existingNumber) {
      return alert(`Number "${number}" is already in contacts list`);
    }

    this.handleAddNewContact(name, number);
  };

  handleAddNewContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(prevState => {
      return { contacts: [contact, ...prevState.contacts] };
    });
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleChangeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase(normalizedFilter))
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} />

        <h2>Contacts</h2>
        <ContactsFilter
          value={this.state.filter}
          onChange={this.handleChangeFilter}
        />
        <ContactsList
          contacts={visibleContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
