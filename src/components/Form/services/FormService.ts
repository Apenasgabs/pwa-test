import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';
const postURL = `${API_BASE_URL}/api/change-testimony`;
export const submitMyForm = async (data: FormData) => {
	try {
		const response = await axios.post(postURL, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	} catch (error) {
		console.log('error: ', error);
		return error;
	}
};
