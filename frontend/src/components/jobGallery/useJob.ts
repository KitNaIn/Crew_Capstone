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

    const acceptJob = async (jobId: string) => {
        const url = `/api/jobs/${jobId}/accept`;
        try {
            await axios.put(url);
            const updatedJobsResponse = await axios.get('/api/jobs/sorted');
            const updatedJobs = updatedJobsResponse.data;

            const updatedJobEntry = updatedJobs.find((job : Jobs ) => job.uuid === jobId);
            if (updatedJobEntry) {
                const updatedJobsList = jobs.map((job) => {
                    if (job.uuid === jobId) {
                        return updatedJobEntry;
                    }
                    return job;
                });
                setJobs(updatedJobsList);
            }
        } catch (error) {
            console.error(`Error accepting Job ${jobId}`, error);
        }
    };




    const rejectJob = async (jobId: string) => {
        const url = `/api/jobs/${jobId}/reject`;
        try {
            await axios.put(url);
            const updatedJobsResponse = await axios.get('/api/jobs/sorted');
            const updatedJobs = updatedJobsResponse.data;

            const updatedJobEntry = updatedJobs.find((job : Jobs ) => job.uuid === jobId);
            if (updatedJobEntry) {
                const updatedJobsList = jobs.map((job) => {
                    if (job.uuid === jobId) {
                        return updatedJobEntry;
                    }
                    return job;
                });
                setJobs(updatedJobsList);
            }
        } catch (error) {
            console.error(`Error rejecting Job ${jobId}`, error);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return [jobs, fetchJobs, acceptJob, rejectJob];
};

export default useJobs;
