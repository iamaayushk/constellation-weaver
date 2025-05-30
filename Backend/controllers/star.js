const Constellations = require('../models/constellation');
const mongoose = require('mongoose');

// Saving the constellation
exports.save = async (req, res) => {
    try {
        // const { points, name, meaning, userId } = req.body;
        const userId = req.user?.userId;
        const {  name, meaning } = req.body;
        if (!name || !meaning || !userId) {
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            });
        }

        

        const createConstellation = await Constellations.create({
            userId,
            // points,
            name,
            meaning,
            story: `${name}, ${meaning}`
        });

        return res.status(201).json({
            success: true,
            message: "Constellation Created Successfully",
            data: createConstellation,
        });
    } catch (error) {
        console.error("Error constellation ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error:error.message
        });
    }
}

// Saving

// exports.save = async (req, res) => {
    //     try {
        //         const { points, name, meaning, userId} = req.body;
        
        //         // Get userId from the authenticated request
        //         // const userId = req.user.userId; 
        
        //         if ( !points|| !name || !meaning || !userId) {
            //             return res.status(400).json({
                //                 success: false,
                //                 message: "All fields are required",
                //             });
                //         }
                
                //         const createConstellation = await Constellations.create({
                    //             userId,
//             points,
//             name,
//             meaning,
//             story: `${name}, ${meaning}`
//         });

//         return res.status(200).json({
    //             success: true,
    //             message: "Constellation Created Successfully",
    //             data: createConstellation,
    //         });
//     } catch (error) {
    //         console.error("Error saving constellation:", error);
    //         return res.status(500).json({
        //             success: false,
        //             message: "Internal server error",
        //         });
        //     }
        // };
        
        
        // Getting all constellations 
        exports.constellations = async (req, res) => {
    try {
        const findConstellation = await Constellations.find();

        if (!findConstellation || findConstellation.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No constellations found ",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Constellations found successfully",
            data: findConstellation,
        });
    } catch (error) {
        console.error("Error in finding data", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Getting a Constellation with id
// exports.getUserConstellations = async (req, res) => {
//     try {
//         const userId = req.user.id; 

//         const userConstellations = await Constellation.find({ userId }).populate("userId", "name email image");

//         if (!userConstellations.length) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No constellations found for this user",
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: "User constellations fetched successfully",
//             data: userConstellations,
//         });
//     } catch (error) {
//         console.error("Error fetching user constellations", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error",
//         });
//     }
// };


// Deleting a constellation 

exports.getUserConstellations = async (req, res) => {
    try {
        const { userId } = req.params; // Extract userId from URL params

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid User ID format" });
        }

        const userConstellations = await Constellations.find({ userId })
            .populate("userId", "name email image"); 

        if (!userConstellations.length) {
            return res.status(404).json({
                success: false,
                message: "No constellations found for this user"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User constellations fetched successfully",
            data: userConstellations
        });
    } catch (error) {
        console.error("Error fetching user constellations:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

exports.deleteConstellation = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteConstellation = await Constellations.findByIdAndDelete(id);

        if (!deleteConstellation) {
            return res.status(404).json({ success: false, message: "No constellation found" })
        }
        return res.status(200).json({ success: true, message: "Constellation deleted successfully", data: deleteConstellation });
    }
    catch (err) {
        console.log("Error in fetching data", err);
        return res.status(400).json({
            success: false,
            message: "Internal server error while deleting"
        });

    }
}

// Updating the constellation
exports.updateConstellation = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, meaning, story } = req.body;
        const updateConstellation = await Constellations.findByIdAndUpdate(
            id,
            { name, meaning, story },
            { new: true },
        );

        if (!updateConstellation) {
            return res.status(404).json({ success: false, message: "No constellation found to update" });

        }
        return res.status(200).json({ success: true, message: "Successfully updated the constellation", data: updateConstellation });
    }
    catch (err) {
        console.log("Error in updating the data", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}