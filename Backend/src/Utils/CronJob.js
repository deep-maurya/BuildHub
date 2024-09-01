const { CronJob } = require('cron');

const cronJob = new CronJob(
  '* * * * * *', // cronTime: Executes every second
  function () {
    console.log('You will see this message every second');
  },
  null, // onComplete: Function to be executed when the job stops (not required here)
  true, // start: Start the job right after it is created
  'America/Los_Angeles' // timeZone: The timezone in which the cron job should run
);
cronJob.stop()

module.exports = {cronJob}
