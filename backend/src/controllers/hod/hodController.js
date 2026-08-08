const hodService = require("../../services/hod/hodService");

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

const getHODStats = async (req, res, next) => {
  try {
    const stats = await hodService.getHODStats();

    return res.status(200).json({
      success: true,
      message: "HOD statistics fetched successfully",
      data: stats,
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
// Get HOD Dashboard Statistics
// ==========================================
const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await hodService.getDashboardStats(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Dashboard statistics fetched successfully",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};
// ==========================================
// Get Logged In HOD Profile
// ==========================================
const getHODProfile = async (req, res, next) => {
  try {
    const hod = await hodService.getHODProfile(req.user.id);

    return res.status(200).json({
      success: true,
      message: "HOD profile fetched successfully",
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
// ==========================================
// Get Recent Results
// ==========================================
const getRecentResults = async (req, res, next) => {
  try {
    const results = await hodService.getRecentResults(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Recent results fetched successfully",
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createHOD,
  getHODStats,
    getAllHODs,
    getHODById,
    getHODProfile,
    getDashboardStats,
    updateHOD,
    deleteHOD,
    getRecentResults,
};