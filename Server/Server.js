const express=require("express");
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cors=require("cors");

const {Jobs,JobDetails}= require("./models/jobs"); 
const jobbyUsers=require("./models/jobbyUsers");
const app=express();
const port=4446 ||process.env.PORT


//sending data to db 

const addJobs = async () => {
  try {
    const jobDetail = new JobDetails({
      title: "Frontend Engineer",
      companyLogoUrl:   "https://assets.ccbp.in/frontend/react-js/jobby-app/google-img.png",
      companyWebsiteUrl:   "https://about.google.com/",
      rating: 5,
      location: "Chennai",
      packagePerAnnum: "44 LPA",
      jobDescription:"As a Frontend Engineer, you will be directly responsible for helping the evolution of enterprise design systems at Google. You will engineer solutions that create shareable web components to be used in enterprise products within the organization. You’ll support multiple different product areas.",
      skills: [
        {
            name: "HTML 5",
            imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/html-img.png"
            },
            {
            name: "CSS 3",
            imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/css-img.png"
            },
            {
            name: "Javascript",
            imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/javascript-img.png"
            },
            {
            name: "React JS",
            imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/reactjs-img.png"
            },
            {
            name: "Redux",
            imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/redux-img.png"
        }
      ],

      lifeAtCompany: {
        description: "Our core philosophy is people over process. Our culture has been instrumental to our success. It has helped us attract and retain stunning colleagues, making work here more satisfying. Entertainment, like friendship, is a fundamental human need, and it changes how we feel and gives us common ground. We want to entertain the world.",
        imageUrl:  "https://assets.ccbp.in/frontend/react-js/jobby-app/google-img.png"
      },
      employementType: "Part Time",
    });

    const savedJobDetail = await jobDetail.save();
    // Create and save a Job document that uses the same _id as the JobDetail

    const job = new Jobs({
      _id: savedJobDetail._id, // Use the same _id as the JobDetail
      title: "Frontend Engineer",
      companyLogoUrl:  "https://assets.ccbp.in/frontend/react-js/jobby-app/google-img.png",
      rating: 5,
      location: "Chennai",
      packagePerAnnum: "44 LPA",
      jobDescription:"As a Frontend Engineer, you will be directly responsible for helping the evolution of enterprise design systems at Google. You will engineer solutions that create shareable web components to be used in enterprise products within the organization. You’ll support multiple different product areas.",
      employementType: "Part Time",
    });

    await job.save();
    await mongoose.disconnect();
  } catch (e) {
    console.log(e);
  }
};

// addJobs()

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://pavankalyan0571:pavankalyan@cluster0.zf0c6wi.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log('DB Connected'))
.catch((error)=>console.log(error));

 app.use("/auth",require("./routes/authRoutes"));
 app.use("/api",require("./routes/apiRoutes"));

app.listen(port,()=>console.log(`Server Running at ${port}`));