import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar({ onSubmitSearchQuery }) {
  const [query, setQuery] = useState('');

  const onChange = e => {
    const { value } = e.target;
    setQuery(value);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (query.trim()) {
      onSubmitSearchQuery(query);
      resetForm();
      return;
    }
    toast('Please, enter your request in search field', { toastId: 'Searchbar-toast' });
  };

  const resetForm = () => {
    setQuery('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search for movies"
        value={query}
        onChange={onChange}
      />

      <button type="submit">
        <span>Search</span>
      </button>
    </form>
  );
}

Searchbar.propTypes = { onSubmitSearchQuery: PropTypes.func.isRequired };
