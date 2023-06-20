import { useState } from 'react';
import axios from 'axios';
import { Jobs } from './model/Jobs';

const useJobs = (): [Jobs[], () => void] => {
    const [jobs, setJobs] = useState<Jobs[]>([]);

    const fetchJobs = () => {
        const url = '/api/jobs';
        axios
            .get(url)
            .then((response) => {
                setJobs(response.data);
            })
            .catch((error) => {
                console.error('Error fetching Jobs', error);
                setJobs([]);
            });
    };

    return [jobs, fetchJobs];
};

export default useJobs;