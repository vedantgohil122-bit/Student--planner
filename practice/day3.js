// function fetchData(callback) {
//     console.log("Fetching data...");
    
//     setTimeout(() => {
//         const data = "Here is your data!";
//         callback(data);
//     }, 2000);
// }

// function handleData(data) {
//     console.log(`Received: ${data}`);
// }

// fetchData(handleData);
// console.log("This runs while data is being fetched...");


// function fetchDataPromise() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const success = false;

//             if (success) {
//                 resolve("Data fetched successfully!");
//             } else {
//                 reject("Something went wrong!");
//             }
//         }, 1000);
//     });
// }

// fetchDataPromise()
//     .then(data => console.log(data))
//     .catch(error => console.log(error));




// STEP 1 - The Promise function
function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true;

            if (success) {
                resolve("Data fetched successfully!");
            } else {
                reject("Something went wrong!");
            }
        }, 1000);
    });
}

// STEP 2 - Using async/await to call that Promise
async function getData() {
    try {
        const data = await fetchDataPromise();
        console.log(`Result: ${data}`);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

// STEP 3 - Run it
getData();