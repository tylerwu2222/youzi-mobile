import database from '@react-native-firebase/database';

// export function addUser(userID = 123) {
//     console.log('adding user', userID);
//     // set user with desired parameters
//     database()
//         .ref('/users/' + userID)
//         .set({
//             name: 'Tyler Wu',
//             age: 24,
//             level: 1,
//             allowNSFW: true,
//             simpTrad: 'simp',
//             pastPrompts: [],
//             transcripts: []
//         })
//         .then(() => console.log('Data set.'));
// };


// Usage example
const defaultUserData = {
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: new Date().toISOString(),
};

// Function to add a user to the database
export const addUser = (userData = defaultUserData) => {
    // Generate a unique key for the user
    const userId = database().ref().child('users').push().key;

    // Set user data at the generated key
    return database().ref(`/users/${userId}`).set(userData);
};

// addUser(userData)
//     .then(() => {
//         console.log('User added to database successfully');
//     })
//     .catch((error) => {
//         console.error('Error adding user to database:', error);
//     });