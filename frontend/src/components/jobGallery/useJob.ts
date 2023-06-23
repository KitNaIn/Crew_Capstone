import { useState, useEffect } from 'react';
import axios from 'axios';
import { Jobs } from './model/jobs';

type UseJobsReturnType = [
    Jobs[],
    () => void,
    (jobId: string) => void,
    (jobId: string) => void
];

const useJobs = (): UseJobsReturnType => {
    const [jobs, setJobs] = useState<Jobs[]>([]);

    const fetchJobs = () => {
        const url = '/api/jobs/sorted';
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

    const acceptJob = (jobId: string) => {
        const url = `/api/jobs/${jobId}/accept`;
        axios
            .put(url)
            .then(() => {
            })
            .catch((error) => {
                console.error(`Error accepting Job ${jobId}`, error);
            });

    };

    const rejectJob = (jobId: string) => {
        const url = `/api/jobs/${jobId}/reject`;
        axios
            .put(url)
            .then(() => {
            })
            .catch((error) => {
                console.error(`Error rejecting Job ${jobId}`, error);
            });
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return [jobs, fetchJobs, acceptJob, rejectJob];
};

export default useJobs;
