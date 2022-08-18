import { FC, FormEvent, useCallback, useState } from "react";
import DiscordForm from "src/App/Routes/Modals/RegisterModal/DiscordForm/View";
import useContactInformation from "src/hooks/contact-information";

const DiscordFormContainer: FC = () => {
  const { register, loading, error } = useContactInformation();
  const [discordHandle, setDiscordHandle] = useState("");

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      register(discordHandle);
    },
    [discordHandle]
  );

  return (
    <DiscordForm
      value={discordHandle}
      onChange={setDiscordHandle}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default DiscordFormContainer;
