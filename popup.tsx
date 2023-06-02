import { Button, Stack } from "@mui/material";
import { sendToContentScript } from "@plasmohq/messaging"
import { useState } from "react";

function IndexPopup() {
  const [disemvoweled, setDisemvoweled] = useState(false);

  async function handleClick(command) {
    const resp = await sendToContentScript({ name: command });
    console.log(resp);
    if (resp === 'disemvoweled') {
      setDisemvoweled(true);
    } else if (resp === 'reset') {
      setDisemvoweled(false);
    }
  }

  return (
    <Stack direction='row' gap={2}>
      <Button disabled={disemvoweled} variant="contained" color="primary" onClick={() => handleClick("disemvowel")}>Disemvowel</Button>
      <Button disabled={!disemvoweled} variant="contained" color="secondary" onClick={() => handleClick("reset")}>Reset</Button>
    </Stack>
  )
}

export default IndexPopup
