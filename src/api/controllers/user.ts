import httpStatus from "http-status";
import { celebrate } from "celebrate";
import Joi from "joi";
import moment from 'moment'
import User from "../entities/User";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Room from "../entities/Room";

const getUser = {

  controller: async (req: any, res: Response) => {
    try {

      const user = {
        id: req.user.id,
        email: req.user.email,
        first_name: req.user.given_name,
        last_name: req.user.family_name,
        avatar: req.user.picture
      }

      if (req.user) {
        return res
          .status(httpStatus.OK)
          .json({
            data: user,
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


const getAllUser = {

  validator: celebrate({
    body: Joi.object().keys({
      id: Joi.string().required(),
    })
  }),

  controller: async (req: Request, res: Response) => {
    try {
      const userRepo = getRepository(User);
      const users = await userRepo
        .createQueryBuilder('user')
        .where('user.id != :ids', { ids: req.body.id })
        .getMany()

      const roomRepo = getRepository(Room);

      let isRoom: any = await roomRepo
        .createQueryBuilder('room')
        .select(["room.id", "members.id", "messages"])
        .where('room.name = :name', { name: 'personal' })
        .leftJoin("room.members", "members")
        .leftJoin("room.messages", "messages")
        .getMany()

      users.map((user: any) => {
        const room = isRoom.filter((x: any) => {
          return (
            x.members.length === 2
            && [req.body.id, user.id].includes(x.members[0].id)
            && [req.body.id, user.id].includes(x.members[1].id)
          );
        })[0];
        user["room"] = room?.id;
        user["message"] = room?.messages[0]?.message;
        if (room?.messages[0]?.created_at) {
          user["lastDate"] = moment(room?.messages[0]?.created_at).calendar();
        }
      })

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
      console.log(error);

      return res
        .status(httpStatus.BAD_REQUEST)
        .json({
          data: null,
          message: 'Error ' + error
        })
    }

  }
}

const getRoomUser = {

  validator: celebrate({
    body: Joi.object().keys({
      room_id: Joi.string().required(),
      personal: Joi.bool().required(),
      user_id: Joi.string().required(),
    })
  }),

  controller: async (req: Request, res: Response) => {
    try {
      const roomRepo = getRepository(Room);
      const users = await roomRepo
        .createQueryBuilder('room')
        .select(['room.id', 'room.name', 'members'])
        .leftJoin('room.members', 'members')
        .where('room.id = :id', { id: req.body.room_id })
        .andWhere('members.id != :user_id', { user_id: req.body.user_id })
        .getOne()

      if (users) {
        return res
          .status(httpStatus.OK)
          .json({
            room: users,
            message: 'room user got successfully'
          })
      }

      throw new Error("Error in getting room users");

    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({
          room: null,
          message: 'Error ' + Error
        })
    }

  }
}

export {
  getUser,
  getAllUser,
  getRoomUser
}