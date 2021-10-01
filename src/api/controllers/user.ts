import httpStatus from "http-status";
import { celebrate } from "celebrate";
import Joi from "joi";

import User from "../entities/User";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

const signup = {
  validator: celebrate({
    body: Joi.object().keys({
      username: Joi.string().required(),
    })
  }),

  controller: async (req: Request, res: Response) => {
    try {
      console.log(1);
      
      const userRepo = getRepository(User);
      const isUser = await userRepo.findOne(req.body.username);
      console.log(2);
      

      if (isUser) {
        return res
          .status(httpStatus.OK)
          .json({
            data: isUser.username,
            message: 'Account already exists'
          })
      }

      const user = await userRepo.save(
        userRepo.create({
          username: req.body.username
        })
      )

      console.log(3);
      

      if (user) {
        return res
          .status(httpStatus.OK)
          .json({
            data: user.username,
            message: 'Account created'
          })
      }

      throw new Error("User Not Added");

    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({
          data: null,
          message: 'Error ' + Error
        })
    }

  }
}

const getAllUser = {

  validator: celebrate({
    body: Joi.object().keys({
      username: Joi.string().required(),
    })
  }),

  controller: async (req: Request, res: Response) => {
    try {
      const userRepo = getRepository(User);
      const users = await userRepo
        .createQueryBuilder('user')
        .where('user.username != :username', { username: req.body.username })
        .getMany()

      if (users) {
        return res
          .status(httpStatus.OK)
          .json({
            data: users,
            message: 'user got successfully'
          })
      }

      throw new Error("Error in getting users");

    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({
          data: null,
          message: 'Error ' + Error
        })
    }

  }
}

export {
  signup,
  getAllUser
}