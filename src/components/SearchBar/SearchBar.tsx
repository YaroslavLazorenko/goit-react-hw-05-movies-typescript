import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SearchBar({ onSubmitSearchQuery }) {
  const [query, setQuery] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setQuery(value);
  };

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();

    if (query.trim()) {
      onSubmitSearchQuery(query);
      resetForm();
      return;
    }
    toast('Please, enter your request in search field', { toastId: 'Searchbar-toast' });
  };

  const resetForm = (): void => {
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

SearchBar.propTypes = { onSubmitSearchQuery: PropTypes.func.isRequired };
