import React, { useEffect, useState } from 'react';
import axios from "axios";

function Todos () {
    const [ todos, setTodos ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                setTodos(null);
                setError(null);
                setLoading(true);
                const response = await axios.get(
                    'http://jsonplaceholder.typicode.com/todos/wdww'
                );
                console.log(response.data);
                setTodos(response.data);
            } catch (e) {
                console.log(e.response.status);
                setError(e);
            }
            setLoading(false);
        };
        fetchTodos();
    }, []);

    if (loading) return <div>로딩중..</div>
    if (error) return <div>에러가 발생했습니다.</div>
    if (!Todos) return null;

    return (
        <ul>
            {todos && todos.map(todo => <li key={todo.id}>
                {todo.userId} ({todo.title})
            </li>)}
        </ul>
    );
}

export default Todos;