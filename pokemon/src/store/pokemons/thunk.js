// export const getUserFromBackend = (token) => {
// 	return async function (dispatch) {
// 		const userFromBackend = await fetch('http://localhost:4000/users/me', {
// 			method: 'GET',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: token,
// 			},
// 		})
// 			.then((res) => res.json())
// 			.catch((error) => console.log(error));
// 		dispatch(getUser(userFromBackend.result));
// 	};
// };
