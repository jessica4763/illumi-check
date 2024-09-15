const AddTodoForm = () => {
    const [title, setTitle] = useState('');
  
    fetch('http://localhost:8000/api/todos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    })
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
    );
  };
  
  export default AddTodoForm;