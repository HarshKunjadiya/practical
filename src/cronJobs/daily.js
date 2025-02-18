import { CronJob } from 'cron';

export function cronjob() {
    const job = new CronJob('* * * * * *', () => {
        console.log("hello cron...");
    }, () => {
        console.log("job completed...");
    }, true, 'Asia/Kolkata');

    job.start();
}
