const courseService = require("../services/courseService");

const createCourse = async (req, res, next) => {
  try {
    const course = await courseService.createCourse(req.body);

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await courseService.getAllCourses();

    res.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const course = await courseService.getCourseById(req.params.id);

    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const course = await courseService.updateCourse(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const result = await courseService.deleteCourse(req.params.id);

    res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};