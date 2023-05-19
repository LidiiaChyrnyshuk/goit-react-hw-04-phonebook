import { Component } from 'react';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form
        autoComplete="off"
        onSubmit={this.handleSubmit}
        className={css.form}
      >
        <label htmlFor="name" className={css.label}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            value={name}
            placeholder="Rosie Simpson"
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label htmlFor="number" className={css.label}>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            value={number}
            placeholder="+380556688995"
            onChange={this.handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit" className={css.btn}>
          Add contact
        </button>
      </form>
    );
  }
}
