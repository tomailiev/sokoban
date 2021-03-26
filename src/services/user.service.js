// const user = {
//     uid: 1234,
//     name: 'Joe',
//     email: 'a@a.com',
//     bestLevel: 1,
// }
const user = null;
function getUser() {
    return Promise.resolve(user);
}

export default getUser;