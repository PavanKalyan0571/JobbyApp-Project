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
      title: "Fullstack Developer",
      companyLogoUrl:   "https://assets.ccbp.in/frontend/react-js/jobby-app/google-img.png",
      companyWebsiteUrl:   "https://about.google.com/",
      rating: 4,
      location: "Bangalore",
      packagePerAnnum: "14 LPA",
      jobDescription:"Google is and always will be an engineering company. We hire people with a broad set of technical skills who are ready to take on some of technology's greatest challenges and make an impact on millions, if not billions, of users. Google engineers are changing the world one technological achievement after another.",
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
      employementType: "Internship",
    },);

    const savedJobDetail = await jobDetail.save();
    // Create and save a Job document that uses the same _id as the JobDetail

    const job = new Jobs({
      _id: savedJobDetail._id, // Use the same _id as the JobDetail
      title: "Fullstack Developer",
      companyLogoUrl:  "https://assets.ccbp.in/frontend/react-js/jobby-app/google-img.png",
      rating: 4,
      location: "Bangalore",
      packagePerAnnum: "14 LPA",
      jobDescription:"Google is and always will be an engineering company. We hire people with a broad set of technical skills who are ready to take on some of technology's greatest challenges and make an impact on millions, if not billions, of users. Google engineers are changing the world one technological achievement after another.",
      employementType: "Internship",
    });

    await job.save();
    await mongoose.disconnect();
  } catch (e) {
    console.log(e);
  }
};

//addJobs()

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://pavankalyan0571:pavankalyan@cluster0.zf0c6wi.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log('DB Connected'))
.catch((error)=>console.log(error));

 app.use("/auth",require("./routes/authRoutes"));
 app.use("/api",require("./routes/apiRoutes"));

app.listen(port,()=>console.log(`Server Running at ${port}`));