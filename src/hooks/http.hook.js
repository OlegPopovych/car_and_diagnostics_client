
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../store/token_slice';


export const useHttp = () => {
	console.log('try to fetch list 1 ')
	// const [process, setProcess] = useState('waiting');
	const token = useSelector(selectToken);
	console.log('try to fetch list 2 ')
	const request = async (
		url, method = 'GET', credentials = "include", body = null, headers = {
			"Content-Type": "application/json", Authorization: `Bearer ${token}`
		}
	) => {

		try {
			console.log('try to fetch list 3 ')
			const response = await fetch(url, { method, credentials, body, headers });
			console.log('try to fetch list 3 ', response)
			if (!response.ok) {
				throw new Error(`Could not fetch ${url}, status: ${response.status}`);
			}

			const data = await response.json();
			console.log("car list loaded with data: ", data);
			return data;
		} catch (e) {
			// setProcess('error');
			console.log("car list loaded error: ", e);
			throw e;
		}
	};

	// const clearError = useCallback(() => {
	// setProcess('loading');
	// }, []);

	return {
		request,
		// clearError, 
		// process, 
		// setProcess
	}
}

// body:JSON.stringifi(body)