import connectDB from '../../models/dbconnect.js';
import Notification from '../../models/notification/notification';

import User from "../../controller/User/user.controller.js"

import sendEmail from '../email/sendEmail';

const storeData = async (data) => {
    await connectDB();

    try {
        const { user, message } = data;

        // Find user by email
        const userObj = await User.findOne({ email: user });
        if (!userObj) {
            throw new Error('User not found');
        }

        // Create a new notification
        const notification = new Notification({
            user: userObj._id,
            message
        });

        const result = await notification.save();
        console.log(`New document inserted with _id: ${result._id}`);

        // Send email to user
        await sendEmail('Notification', message, userObj.email);

    } catch (error) {
        console.error('Error storing data:', error);
    }
};

// Example new data
const newData = {
    user: 'dhruv.raval.official@gmail.com',
    message: 'This is a test notification'
};

// Uncomment the following line to store the example data
storeData(newData);

export default storeData;
