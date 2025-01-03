import { RequestHandler } from "express";
import TaskModel from "src/models/task";

export const getAllTasks: RequestHandler = async (req, res, next) => {
  try {
    const tasks = await TaskModel.find({}).sort("-dateCreated").populate("assignee");
    console.log(tasks);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};
