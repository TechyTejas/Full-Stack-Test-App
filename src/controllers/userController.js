const TestAppUsers = require('../models/test-app-users');

const createTestUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const test_user = await TestAppUsers.create({
            name: name,
            email: email,
            password: password,
        });
        console.log(`User created with name ${name}`);
        res.status(200).json({ message: `User ${name} added successfully`, user: test_user });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error adding details");
        return;
    }
}

const getUsers = async (req, res) => {
    try{
        const users = await TestAppUsers.findAll();
        console.log("All users fetched successfully");
        res.status(200).json(users);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error fetching users");
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCount = await TestAppUsers.destroy({ where: { id } });
        if (!deletedCount) {
            res.status(404).send("User not found");
            return;
        }
        console.log(`User ${id} deleted successfully`);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error deleting user");
    }
}

module.exports = {
    createTestUser,
    getUsers,
    deleteUser
}