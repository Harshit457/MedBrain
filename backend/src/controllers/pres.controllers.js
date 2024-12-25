
import Pres from "../models/presModel.js";
import User from "../models/user.model.js";
// Create a new prescription
 export const createPrescription = async (req, res) => {
    try {
        const key = req.user._id;
        const { doctorName, date, medicines, documentUpload, hospitalName } = req.body;

        const pres = new Pres({
            doctorName,
            date,
            medicines,
            documentUpload,
            hospitalName,
            key,
        });

        const savedPres = await pres.save();
        res.status(201).json(savedPres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all prescriptions
export const getAllPrescriptions = async (req, res) => {
    try {
        const reqid = req.user._id;
        const presList = await Pres.find().where('key').equals(reqid);
        res.status(200).json(presList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Update a prescription by ID
export const updatePrescriptionById = async (req, res) => {
    try {
        const updatedPres = await Pres.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedPres) {
            return res.status(404).json({ error: 'Prescription not found' });
        }
        res.status(200).json(updatedPres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a prescription by ID
export const deletePrescriptionById = async (req, res) => {
    try {
        const deletedPres = await Pres.findByIdAndDelete(req.params.id);
        if (!deletedPres) {
            return res.status(404).json({ error: 'Prescription not found' });
        }
        res.status(200).json({ message: 'Prescription deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

