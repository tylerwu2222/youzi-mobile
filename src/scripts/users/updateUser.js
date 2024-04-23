import database from '@react-native-firebase/database';

export function updateUser(userID = 123) {
    database()
        .ref('/users/' + userID)
        .update({
            age: 32,
        })
        .then(() => console.log('Data updated.'));
}