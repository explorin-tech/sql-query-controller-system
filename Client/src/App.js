import { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios
      .get('/api/get/applications')
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);

  return <div>SQL - Query Controller System</div>;
}

export default App;
