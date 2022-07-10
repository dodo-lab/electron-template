import {CssBaseline, Stack, Typography} from '@mui/material';
import {MemoryRouter as Router, Route, Routes} from 'react-router-dom';

const Sample = () => {
  return (
    <Stack sx={{justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'lightblue'}}>
      <Typography variant="h2">Electron template</Typography>
    </Stack>
  );
};

export default function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Sample />} />
        </Routes>
      </Router>
    </>
  );
}
