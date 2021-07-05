import React, { useEffect } from 'react';

function Sample() {
    useEffect(() => {
        console.log('컴포넌트가 마운트될 때 호출됨');
        return () => {
            console.log('컴포넌트가 언마운트될 때 호출됨');
        }
    }, []);
}

export default Sample;



const count = useMemo(() => countTodo(todos), [todos]);


count