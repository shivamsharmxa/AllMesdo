const axios = require("axios");

const BASE_URL = "http://localhost:3002";

async function testJobNotifications() {
  try {
    // 1. Register employer
    const employer = await axios.post(`${BASE_URL}/api/auth/register`, {
      username: "testemployer",
      email: "testemployer@test.com",
      password: "password123",
    });
    console.log("Employer registered:", employer.data);

    // 2. Register job seeker
    const jobSeeker = await axios.post(`${BASE_URL}/api/auth/register`, {
      username: "testjobseeker",
      email: "testjobseeker@test.com",
      password: "password123",
    });
    console.log("Job seeker registered:", jobSeeker.data);

    // 3. Job seeker follows employer
    const followRequest = await axios.post(
      `${BASE_URL}/api/follow/request`,
      {
        recipientId: employer.data.user._id,
      },
      {
        headers: {
          Authorization: `Bearer ${jobSeeker.data.token}`,
        },
      }
    );
    console.log("Follow request sent:", followRequest.data);

    // 4. Employer accepts follow request
    const acceptFollow = await axios.post(
      `${BASE_URL}/api/follow/accept`,
      {
        notificationId: followRequest.data.notificationId,
      },
      {
        headers: {
          Authorization: `Bearer ${employer.data.token}`,
        },
      }
    );
    console.log("Follow request accepted:", acceptFollow.data);

    // 5. Employer posts a job
    const job = await axios.post(
      `${BASE_URL}/api/jobs`,
      {
        title: "Software Engineer",
        company: "Test Tech Co",
        location: "Remote",
        area: "Technology",
        salary: {
          min: 80000,
          max: 120000,
          currency: "USD",
          period: "year",
        },
        description: "Exciting opportunity for a software engineer",
        requirements: ["3+ years experience", "Node.js", "React"],
        jobCategory: "Technology",
        department: "Engineering",
        shift: "Day Shift",
      },
      {
        headers: {
          Authorization: `Bearer ${employer.data.token}`,
        },
      }
    );
    console.log("Job posted:", job.data);

    console.log(
      "\nTest completed successfully! Check the jobseeker browser for notifications."
    );
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

testJobNotifications();
