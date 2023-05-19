import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactsList.module.css';

export const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={css.contactList}>
      {contacts.map(({ id, name, number }) => {
        return (
          <li key={id} id={id} className={css.item}>
            <p className={css.itemName}>
              {name}:<span>{number}</span>
            </p>
            <button
              className={css.btnDelete}
              type="button"
              onClick={() => onDeleteContact(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onDeleteContact: PropTypes.func,
};
