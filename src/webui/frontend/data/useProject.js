import useHttp from './useHttp';

const useProject = (fetchOpts, dependencies = []) => {
    const baseUri = 'https://localhost/api/projects';
    const [loading, data, error] = useHttp(baseUri, fetchOpts, dependencies);
    
    return [loading, data];
}

export default useProject;
