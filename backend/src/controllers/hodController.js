const hodService = require("../services/hodService");

// ==========================================
// Create HOD
// ==========================================
const createHOD = async (req, res, next) => {
  try {
    const hod = await hodService.createHOD(req.body);

    return res.status(201).json({
      success: true,
      message: "HOD created successfully",
      data: hod,
    });
  } catch (error) {
    next(error);
  }
};
// ==========================================
// Get All HODs
// ==========================================
const getAllHODs = async (req, res, next) => {
  try {
    const hods = await hodService.getAllHODs();

    return res.status(200).json({
      success: true,
      message: "HODs fetched successfully",
      count: hods.length,
      data: hods,
    });
  } catch (error) {
    next(error);
  }
};
// ==========================================
// Get HOD By ID
// ==========================================
// ==========================================
// Get HOD By ID
// ==========================================
const getHODById = async (req, res, next) => {
  try {
    const hod = await hodService.getHODById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "HOD fetched successfully",
      data: hod,
    });
  } catch (error) {
    next(error);
  }
};
// ==========================================
// Update HOD
// ==========================================
const updateHOD = async (req, res, next) => {
  try {
    const hod = await hodService.updateHOD(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "HOD updated successfully",
      data: hod,
    });
  } catch (error) {
    next(error);
  }
};
// ==========================================
// Delete HOD
// ==========================================
const deleteHOD = async (req, res, next) => {
  try {
    const result = await hodService.deleteHOD(req.params.id);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createHOD,
    getAllHODs,
    getHODById,
    updateHOD,
    deleteHOD,
};