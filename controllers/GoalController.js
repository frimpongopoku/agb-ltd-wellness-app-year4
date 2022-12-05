const Goal = require("../models/GoalModel");
const { appResponse } = require("./misc/objects");

/**
 * Allows staff members to create a new goal
 * @param {*} req
 * @param {*} res
 */
const create = async (req, res) => {
  const { title, description, categories, dueBy, context } = req.body || {};
  const userId = context.aud;
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
    const goal = await Goal.create({
      title,
      description,
      categories,
      dueBy,
      owner: userId,
    });
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

  if (!response)
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
  const { ids } = req.body || {};

  try {
    const response = await Goal.deleteMany(
      {
        _id: {
          $in: ids,
        },
      },
      { new: true }
    );

    if (!response)
      return appResponse({
        res,
        error: `Sorry, could not delete items with id ${id}`,
        data: response,
      });

    return appResponse({ res, data: response });
  } catch (e) {
    appResponse({ res, error: e?.toString() });
  }
};

const listForStaff = async (req, res) => {
  const { userId } = req.body || {};

  if (!userId)
    appResponse({ res, error: "Provide a user_id to load goals for" });

  try {
    const goals = await Goal.find({ owner: userId });

    return appResponse({ res, data: goals });
  } catch (e) {
    appResponse({ res, error: e?.toString() });
  }
};
module.exports = {
  create,
  updateGoal,
  deleteGoal,
  listForStaff,
};
