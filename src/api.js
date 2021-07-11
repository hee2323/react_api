import axios from "axios";

export async function getUsers() {
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
    );
    return response.data;
}

// ★★★링크에 변수 넣을 때는 작은 따옴표 대신 ₩₩ 이거 써야함!!★★★
export async function getUser(id) {
    const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return response.data;
}

