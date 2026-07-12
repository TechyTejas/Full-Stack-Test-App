const TestAppUsers = require('../models/test-app-users');

const createTestUser = async (req, res) => {
    try {
        const {id, name, email, password} = req.body;
        const test_user = await TestAppUsers.create({
            id: id,
            name: name,
            email: email,
            password: password,
        });
        console.log(`User created with name ${name}`);
        res.status(200).send(`User ${name} added successfully`);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error additing details");
        return;
    }
}

const getUsers = async (req, res) => {
    try{
        const users = await TestAppUsers.findAll();
        if(users.length === 0) {
            res.status(404).send("No Students Found");
            return;
        }
        console.log("All users fetched successfully");
        res.status(200).send(users);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(users);
    }
}

module.exports = {
    createTestUser,
    getUsers
}