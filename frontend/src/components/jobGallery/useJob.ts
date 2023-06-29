import {useEffect, useState} from 'react';
import axios from 'axios';
import {Jobs} from './model/jobs';

type UseJobsReturnType = [
    Jobs[],
    () => void,
    (jobId: string, userId: string) => void,
    (jobId: string, userId: string) => void
];

function updateJobs(jobs: Jobs[], jobId: string, updatedJobEntry : Jobs) {
    return jobs.map((job) => {
        if (job.uuid === jobId) {
            return updatedJobEntry;
        }
        return job;
    });
}

async function fetchUpdatedJobs(url: string) {
    await axios.put(url);
    const updatedJobsResponse = await axios.get('/api/jobs/sorted');
    const updatedJobs: Jobs[] = updatedJobsResponse.data;
    return updatedJobs;
}

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

    const acceptJob = async (jobId: string, userId:string) => {
        try {
            const updatedJobs = await fetchUpdatedJobs(`/api/jobs/${jobId}/${userId}/accept`)
            const updatedJobEntry = updatedJobs.find((job : Jobs ) => job.uuid === jobId);
            if (updatedJobEntry) {
                setJobs(updateJobs(jobs, jobId, updatedJobEntry));
            }
        } catch (error) {
            console.error(`Error accepting Job ${jobId}`, error);
        }
    };




    const rejectJob = async (jobId: string, userId: string) => {
        try {
            const updatedJobs = await fetchUpdatedJobs(`/api/jobs/${jobId}/${userId}/reject`);
            const updatedJobEntry = updatedJobs.find((job : Jobs ) => job.uuid === jobId);
            if (updatedJobEntry) {

                setJobs(updateJobs(jobs, jobId, updatedJobEntry));
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
