import React from 'react';
import PropTypes from 'prop-types';
import css from '../ContactForm/ContactForm.module.css';

export const ContactsFilter = ({ value, onChange }) => {
  return (
    <label htmlFor="filter" className={css.label}>
      Find contacts by name
      <input
        className={css.input}
        type="text"
        name="filter"
        title="Please enter a name to find your contacts"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

ContactsFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
