import { Button, Stack } from "@mui/material";


function IndexPopup() {
  return (
    <Stack direction='row' gap={2}>
      <Button variant="contained" color="primary">Disemvowel</Button>
      <Button variant="outlined" color="secondary">Reset</Button>
    </Stack>
  )
}

export default IndexPopup
