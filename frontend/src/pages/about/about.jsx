import { Fragment } from "react";

const AboutPage = () => {
  return (
    <Fragment>
        <div className="container my-5">
            <h1 >About Eco</h1>
            <p>Eco is an online platform for anyone who wants to make the world a better place. Our goal is to provide a platform for people to come together, voice their concerns, and work towards solutions that make a positive impact on the world.</p>
            <p>We believe that small actions can lead to big changes, and Eco is the perfect place to start. Whether you're an individual, a group, or a corporation, you can use our platform to start a petition and gather support for a cause you care about.</p>
            <h2 className="my-4">What You Can Do on Eco</h2>
            <h3>Logged in Users</h3>
            <p>If you're a logged in user, you have even more control over your Eco experience. You can:</p>
            <ul>
                <li>Update and delete your own petitions</li>
                <li>Promote your petitions to get more signatures</li>
                <li>Vote on petitions to show your support</li>
                <li>Comment on petitions to join the conversation</li>
                <li>Start a conversation with other Eco users</li>
            </ul>
            <h3>Visitors</h3>
            <p>If you're not a logged in user, don't worry! You can still use Eco to make a difference. As a visitor, you can:</p>
            <ul>
                <li>Sign petitions</li>
                <li>Favorite petitions to save them for later</li>
                <li>Share petitions on social media to help them gain traction</li>
                <li>Follow the progress of the petitions you care about</li>
            </ul>
            <h2 className="my-3">Our Mission</h2>
            <p>At Eco, our mission is to empower people to make a difference in the world. We believe that by giving people a voice and connecting them with others who share their concerns, we can make the world a better place, one petition at a time.</p>
            <p>We're committed to making Eco a safe and inclusive space for all users, regardless of their background or beliefs. We believe that everyone has the right to make their voice heard, and we will do everything in our power to ensure that our platform remains a place where people can come together and make a positive impact.</p>
            <h3>Join the Movement</h3>
            <p>Are you ready to make a difference? Join Eco today and start making your voice heard. Whether you're passionate about environmental issues, social justice, or any other cause, there's a place for you on Eco.</p>
            <p>Together, we can create a better world. Let's get started!</p>
        </div>
    </Fragment>
  );
};

export default AboutPage;