import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDataChange = (event) => {
    setData(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResponse(null);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('data', data);

    try {
      const res = await axios.post('http://localhost:5000/bfhl', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse(res.data);
    } catch (err) {
      setError('Error uploading file. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="container">
      <h1>File Upload Form</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <textarea
          value={data}
          onChange={handleDataChange}
          placeholder='Enter JSON data here, e.g., {"data": ["a", "b", 1, 2]}'
          required
        />
        <button type="submit">Upload</button>
      </form>
      {response && (
        <div className="response">
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
