// Simulating an asynchronous operation with a Promise
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate a condition for success or failure
            const success = Math.random() > 0.5;

            if (success) {
                resolve({ id: 1, name: 'John Doe' }); // Operation successful
            } else {
                reject(new Error('Failed to fetch data')); // Operation failed
            }
        }, 1000);
    });
}

// Using the fetchData function
fetchData()
    .then(data => {
        console.log('Data fetched successfully:', data);
    })
    .catch(error => {
        console.error('Error:', error.message);
    })
    .finally(() => {
        console.log('Fetch operation complete');
    });


// function test(arg) {
//     return new Promise((resolve, reject) => {
//         if (typeof arg === 'string') {
//             setTimeout(() => {
//                 resolve('Async operation completed');
//             }, 1000);
//         } else if (typeof arg === "number") {
//             reject('Invalid argument')
//         }
//     });
// }

// test(1).then((data) => {
//     console.log(data);
// }).catch((error) => {
//     console.log(error);
// });


async function testAsync() {
    try {
        const data = await test('');
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

testAsync();
console.log('testAsync');