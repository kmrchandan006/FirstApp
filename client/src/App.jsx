import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [name, setName] = useState()
  const [age, setAge] = useState()

  useEffect(() => {
    axios.get('http://localhost:3001/getUsers')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users.');
      });
  }, []);

  const Submit = () =>{
    axios.post('http://localhost:3001/createUser',{name,age})
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users.');
      });
  }

  return (
    
    <div className='center'>
    <h2>First MERN(Mongo, Express, React, Node)App</h2>
      {error ? (
        <div className="error">{error}</div>
      ) : users.length > 0 ? (
        users.map(user => (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <h3>{user.age}</h3>
          </div>
        ))
      ) : (
        <div>No users found.</div>
      )}
      <br/>
      <input type="text" onChange={(e) => setName(e.target.value)}/>
      <input type="text" onChange={(e) => setAge(e.target.value)}/>
      <button onClick={Submit}>Create Users</button>
    </div>
  );
}

export default App;
