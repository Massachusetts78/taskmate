import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

try {
    mongoose.connect(URI).then(() => {});
} catch (err) {
    err;
}
/**
 * Users' server
 */
const User_schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    { versionKey: false },
);

const User = mongoose.model('User', User_schema);

app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const is_already_added = await User.findOne({ email });

        if (is_already_added) {
            res.status(300).send({ err_msg: 'User already added' });
        } else {
            const hashed_password = await bcrypt.hash(password, 10);
            const usr = new User({ name, email, password: hashed_password });

            await usr.save();
            res.status(200).send({ msg: 'Saved', data: usr });
        }
    } catch (err) {
        res.status(404).send({ error_msg: err });
    }
});
app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const usr_to_find = await User.findOne({ email });

        if (!usr_to_find) {
            return res.status(400).send({
                auth_msg: 'User not authenticated: Email not found',
            });
        }

        // Compare the password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(
            password,
            usr_to_find.password,
        );

        if (!isPasswordValid) {
            return res.status(400).send({ auth_msg: 'Invalid password' });
        }
        res.status(200).send({
            auth_msg: 'User authenticated successfully',
            data: usr_to_find,
        });
    } catch (err) {
        res.status(500).send({ error_msg: err.message });
    }
});

app.delete('/delete-account/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).send({ msg: 'User not found' });
        }

        await Task.deleteMany({ taskId: userId });

        res.status(200).send({ msg: 'Account deleted successfully' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    const find = await User.findOne({ email });

    if (!find) {
        return res.status(400).send({ err: 'Cannot find the email' });
    }

    res.status(200).send({ msg: 'Email found successfully!' });
});

app.put('/reset-password/:email', async (req, res) => {
    const { new_password } = req.body;
    const { email } = req.params;

    try {
        const hashedPass = await bcrypt.hash(new_password, 10);

        const updated = await User.updateOne(
            { email },
            { $set: { password: hashedPass } },
        );

        if (updated.modifiedCount > 0) {
            res.status(200).send({ msg: 'User updated successfully' });
        } else {
            res.status(404).send({ msg: 'User not found' });
        }
    } catch (error) {
        res.status(500).send({
            msg: 'Error resetting password',
            err: error.message,
        });
    }
});

app.get('/data/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const users = await User.find({ _id: id }, {}); // Exclude password from the query

        res.status(200).json(users); // Use .json() to send an array
    } catch (err) {
        res.status(500).send({ error_msg: err.message });
    }
});

/**
 * Tasks' server
 */

const task_schema = new mongoose.Schema(
    {
        taskName: { type: String, required: true },
        taskId: { type: String, required: true, ref: 'User' },
        completed: Boolean,
        dueDate: Date,
        important: Boolean,
        description: String,
    },
    { versionKey: false },
);

const Task = mongoose.model('Task', task_schema);

app.post(`/create-task/:userId`, async (req, res) => {
    try {
        const { taskName, description, dueDate, completed, important } =
            req.body;
        const { userId } = req.params;

        if (!userId) {
            return res.status(401).send({ message: 'User not authenticated' });
        }

        const task = new Task({
            taskId: userId,
            taskName,
            description,
            important,
            dueDate,
            completed,
        });

        await task.save();
        res.status(200).send({ message: 'Task created successfully' });
    } catch (err) {
        res.status(500).send({ error: 'Error creating task' });
    }
});

app.get('/get-task/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const usr_to_find = await User.findById(userId);
        if (!usr_to_find) {
            return res.status(400).send({ msg: 'User not found' });
        }

        const tasks = await Task.find({ taskId: userId }, { taskId: 0 });
        res.status(200).send(tasks);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.put('/update-task/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const { taskName, description, dueDate, completed, important } =
            req.body;

        // Validate if the task exists
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }

        task.taskName = taskName;
        task.description = description;
        task.dueDate = dueDate;
        task.completed = completed;
        task.important = important;

        // Save the updated task
        await task.save();
        res.status(200).send({ message: 'Task fully updated', data: task });
    } catch (err) {
        res.status(500).send({
            error: 'Error updating task',
            details: err.message,
        });
    }
});
app.patch('/update-task/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const updateData = req.body;

        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }

        // Update task with the provided data
        Object.assign(task, updateData);

        // Save the updated task
        await task.save();
        res.status(200).send({
            message: 'Task updated successfully',
            data: task,
        });
    } catch (err) {
        res.status(500).send({
            error: 'Error updating task',
            details: err.message,
        });
    }
});

app.delete('/delete-task/:_id', async (req, res) => {
    const { _id } = req.params;

    const tasktoDelete = await Task.deleteOne({ _id: _id });

    if (tasktoDelete) {
        res.status(200).send({ msg: 'User deleted sucessfully' });
    } else {
        res.status(400).send({ err_msg: 'Cannot delete the user' });
    }
});

app.listen(PORT, () => {});
