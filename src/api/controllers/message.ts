import httpStatus from "http-status";
import { celebrate } from "celebrate";
import Joi from "joi";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Room from "../entities/Room";
import User from "../entities/User";
import Message from "../entities/Message";

const addMessage = {
  validator: celebrate({
    body: Joi.object().keys({
      room: Joi.string().required(),
      id: Joi.string().required(),
      message: Joi.string().required(),
    })
  }),

  controller: async (req: Request, res: Response) => {
    try {
      const messageRepo = getRepository(Message);
      const userRepo = getRepository(User);
      const roomRepo = getRepository(Room);

      const user = await userRepo.findOne(req.body.id);
      const room = await roomRepo.findOne(req.body.room);

      const newMessage = await messageRepo.save(
        messageRepo.create({
          room,
          user,
          message: req.body.message
        })
      )

      if (newMessage) {
        return res
          .status(httpStatus.OK)
          .json({
            data: null,
            message: 'message added'
          })
      }

      throw new Error("Message not added");

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

const getMessage = {
  validator: celebrate({
    params: Joi.object().keys({
      room: Joi.string().required(),
    })
  }),

  controller: async (req: Request, res: Response) => {
    try {
      const messageRepo = getRepository(Message);

      const messages = (await messageRepo.
        createQueryBuilder('message')
        .select(['message', 'user.id', 'user.first_name' ])
        .leftJoin('message.user', 'user')
        .where({
          room: req.params.room
        })
        .orderBy("message.created_at", "ASC")
        .getMany())
        .map((message: any) => {
          return {
            id: message.user.id,
            username: message.user.first_name,
            message: message.message
          }
        })
      
      

      if (messages) {
        return res
          .status(httpStatus.OK)
          .json({
            data: messages,
            message: 'messsges got succesfully'
          })
      }

      throw new Error("Error in getting messages");

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
  addMessage,
  getMessage
}