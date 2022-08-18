import { FC, FormEvent } from "react";
import Loader from "src/icons/Loader";

type Props = {
  loading: boolean;
  error?: Error;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  value: string;
  onChange: (value: string) => void;
};

const DiscordForm: FC<Props> = ({ loading, onChange, onSubmit, value, error }) => {
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <form onSubmit={onSubmit}>
      <input value={value} onChange={e => onChange(e.target.value)} />
      <input type="submit" value="Register" />
    </form>
  );
};

export default DiscordForm;
