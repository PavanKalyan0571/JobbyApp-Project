const express = require("express");
const { Jobs, JobDetails } = require("../models/jobs");
const jwtAuth = require("../middleware/jwtAuth")

const router = express.Router();

router.get("/", (req, res) => {
    res.send("This is Api Router Page")
})

//All Jobs
router.get("/jobs", jwtAuth, async (req, res) => {
    const allJobs = await Jobs.find({});
    console.log(allJobs);
    res.json({ jobs: allJobs });
})


//Filters api
router.get("/filterjobs", jwtAuth, async (req, res) => {
    try {
        const { employement_type, minimum_package, search } = req.query;

        const query = {};
        if (employement_type) {
            const employementTypesArray = employement_type.split(',');

            query.employementType = { $in: employementTypesArray.map(type => new RegExp(type, 'i')) }
        }
        if (minimum_package) {
            const minPackageValue = parseFloat(minimum_package.replace(/\D+/g, ''));
            if (!isNaN(minPackageValue)) {
                query.packagePerAnnum = { $gte: minPackageValue }
            }
        }
        if (search) {
            query.title = { $regex: search, $options: 'i' }
        }

        const filteredJobs = await Jobs.find(query)

        if (filteredJobs.length === 0) {
            return res.status(404).json({ messeage: "No Jobs Found" })
        }
        return res.json(filteredJobs);

    } catch (e) {
        console.log(e);
        return res.json({ messeage: "Internal Server Error" })
    }
})

//Individual jobs
router.get("/jobs/:id", async (req, res) => {
    const { id } = req.params;
    const job = await JobDetails.findOne({ _id: id });
    if (!job) {
        return res.json({ messeage: "job not Found" })
    }
    const jobTitle = job.title;
    const similarJobs = await Jobs.find({
        title: { $regex: jobTitle, $options: 'i' },
        _id: { $ne: id }
    })
    // console.log(job);
    res.json({ jobDetails: job, similarJobs: similarJobs });
})

module.exports = router;