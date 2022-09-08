import { FC, FormEvent } from "react";
import Button from "src/components/Button";
import Loader from "src/icons/Loader";

type Props = {
  loading: boolean;
  error?: Error;
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
};

const DiscordForm: FC<Props> = ({ loading, onChange, onSubmit, value, error }) => {
  if (loading) {
    return <Loader className="animate-spin" size={62} />;
  }
  if (error) {
    return <div className="text-4xl text-red-400/70">{error.message}</div>;
  }
  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };
  return (
    <form className="flex flex-col md:flex-row justify-center space-y-4 md:space-x-8" onSubmit={onFormSubmit}>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder="Georges_moustaki#1977" />
      <Button onClick={onSubmit} size="medium">
        Send
      </Button>
    </form>
  );
};

export default DiscordForm;
