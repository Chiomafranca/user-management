const User = require("../model/user");

// Fetch and display all users
const allusers = async (req, res) => {
    try {
        const users = await User.findAll({ raw: true });
        res.render("home", { users });
    } catch (error) {
        console.error("Error fetching users or rendering the home page:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Render the user creation form
const userform = (req, res) => {
    try {
        res.render("create");
    } catch (error) {
        console.error("Error rendering the user creation form:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Save a new user to the database
const saveuser = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const user = await User.create({ name, email, phone });
        console.log("User created:", user);
        res.redirect('/');
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Render the edit form with user data
const editUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ where: { id }, raw: true });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.render("edit", { user });
    } catch (error) {
        console.error("Error fetching user for editing:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Update a user's details
const updateUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const [updated] = await User.update(data, { where: { id } });
        if (!updated) {
            return res.status(404).send("User not found or no changes made");
        }
        res.redirect("/");
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
};

// View a specific user's details
const viewUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id, { raw: true });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.render("user", { user }); 
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Delete a specific user's details
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id); 
        if (!user) {
            return res.status(404).send("User not found");
        }
        await user.destroy(); 
        res.redirect('/'); // Redirect to the home page
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Internal Server Error");
    }
};


module.exports = {
    allusers,
    userform,
    saveuser,
    editUser,
    updateUser,
    viewUser,
    deleteUser
};
