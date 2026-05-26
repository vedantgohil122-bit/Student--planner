const fetch = require("node-fetch");

async function getUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();
        
        users.forEach(user => {
            console.log(`Name: ${user.name} | Email: ${user.email} | Phone: ${user.phone}`);
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

getUsers();