import { useNavigate } from 'react-router-dom';

export default function GoBackButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => {
        navigate(-1);
      }}
    >
      Go back
    </button>
  );
}
