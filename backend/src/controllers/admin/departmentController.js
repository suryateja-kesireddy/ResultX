const departmentService = require("../../services/admin/departmentService");

const createDepartment = async (req, res, next) => {
  try {
    const department = await departmentService.createDepartment(req.body);

    res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: department,
    });
  } catch (error) {
    next(error);
  }
};
// ==========================================
// Get Department Statistics
// ==========================================
const getDepartmentStats = async (req, res, next) => {
  try {
    const stats = await departmentService.getDepartmentStats();

    return res.status(200).json({
      success: true,
      message: "Department statistics fetched successfully",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

const getAllDepartments = async (req, res, next) => {
  try {
    const departments = await departmentService.getAllDepartments();

    res.json({
      success: true,
      data: departments,
    });
  } catch (error) {
    next(error);
  }
};

const getDepartmentById = async (req, res, next) => {
  try {
    const department = await departmentService.getDepartmentById(req.params.id);

    res.json({
      success: true,
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

const updateDepartment = async (req, res, next) => {
  try {
    const department = await departmentService.updateDepartment(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      message: "Department updated successfully",
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

const deleteDepartment = async (req, res, next) => {
  try {
    const result = await departmentService.deleteDepartment(req.params.id);

    res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDepartment,
  getDepartmentStats,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};