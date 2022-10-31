const Goal = require("../models/GoalModel");
const { appResponse } = require("./misc/objects");

/**
 * Allows staff members to create a new goal
 * @param {*} req
 * @param {*} res
 */
const create = async (req, res) => {
  const { title, description, categories, dueBy } = req.body || {};

  if (!dueBy)
    return appResponse({
      res,
      error: "Please provide a date that this goal is due by",
    });

  if (!title || !description || !categories || !categories.length)
    return appResponse({
      res,
      error: "Please provide 'title', 'description' and 'categories'",
    });

  try {
    const goal = await Goal.create({ title, description, categories, dueBy });
    res.status(201).send(appResponse({ data: goal }));
  } catch (e) {
    appResponse({ res, error: e?.toString() });
  }
};

/**
 * Allows staff members to update their goal
 * @param {*} req
 * @param {*} res
 */
const updateGoal = async (req, res) => {
  const { id, data } = req.body || {};
  if (!id)
    return res
      .status(404)
      .send(
        appResponse({ error: "Please provide a valid of an existing goal" })
      );

  const response = await Goal.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });

  if (!response || !response.ok)
    return appResponse({
      res,
      error: `Sorry, could not update any goal with id: ${id} `,
    });

  return appResponse({ res, data: response });
};

/**
 * Allow staff members to remove their goal
 * @param {*} req
 * @param {*} res
 * @returns
 */

const deleteGoal = async (req, res) => {
  const { id } = req.body || {};

  try {
    const response = await Goal.findOneAndDelete({ _id: id }, { new: true });
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
module.exports = {
  create,
  updateGoal,
  deleteGoal,
};
