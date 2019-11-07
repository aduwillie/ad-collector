import useHttp from './useHttp';

const useForm = (fetchOpts, dependencies = []) => {
    const baseUri = 'https://localhost/api/forms';
    const [loading, data, error] = useHttp(baseUri, fetchOpts, dependencies);
    
    return [loading, data];
}

export default useForm;
