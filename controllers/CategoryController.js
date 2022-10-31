const Category = require("../models/CategoryModel");
const { appResponse } = require("./misc/objects");

/**
 * Allows managerrs to add a new categories, that staff members
 * can use later when they are creating their goals
 * @param {*} req
 * @param {*} res
 * @returns
 */
const create = async (req, res) => {
  const { name, description } = req.body || {};
  if (!name || !description)
    return appResponse({
      res,
      error:
        "Please provide a 'name' and 'description' of the category you wish to create!",
    });

  const category = await Category.create({ name, description });

  return res.status(201).send(appResponse({ data: category, status: 201 }));
};

/**
 * Allows managers to edit a category
 * @param {*} req
 * @param {*} res
 */
const updateCategory = async (req, res) => {
  const { id, data } = req.body || {};

  if (!id)
    return appResponse({
      res,
      error: "Provide the id of an existing category",
    });
  Category.findOneAndUpdate({ _id: id }, data, { new: true }).then(
    (response, error) => {
      if (error) return appResponse({ res, error });
      return appResponse({ res, data: response });
    }
  );
};
/**
 * Allows managers to delete a category
 * @param {*} req
 * @param {*} res
 */
const deleteCategory = async (req, res) => {
  const { id } = req.body || {};

  try {
    const response = await Category.findOneAndDelete(
      { _id: id },
      { new: true }
    );
    if (!response)
      return appResponse({
        res,
        error: `Sorry, could not delete item with id:${id}`,
        data: response,
      });

    return appResponse({ res, data: response });
  } catch (e) {
    appResponse({ res, error: e?.toString() });
  }
};
/**
 * Allows managers to fetch all categories
 * @param {*} req
 * @param {*} res
 */
const listAll = async (req, res) => {
  try {
    const data = await Category.find();
    return appResponse({ res, data });
  } catch (e) {
    appResponse({ res, error: e?.toString() });
  }
};

module.exports = {
  create,
  updateCategory,
  deleteCategory,
  listAll,
};
