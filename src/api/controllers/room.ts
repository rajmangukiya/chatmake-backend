import httpStatus from "http-status";
import { celebrate } from "celebrate";
import Joi from "joi";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Room from "../entities/Room";
import User from "../entities/User";

const makeOneChat = {
  validator: celebrate({
    body: Joi.object().keys({
      username1: Joi.string().required(),
      username2: Joi.string().required(),
    })
  }),

  controller: async (req: Request, res: Response) => {
    try {
      const roomRepo = getRepository(Room);

      let isRoom: any = await roomRepo
        .createQueryBuilder('room')
        .select(["room.id", "members.username"])
        .where('room.name = :name', { name: 'personal' })
        .leftJoin("room.members", "members")
        .getMany()

      isRoom = isRoom.map((x: any) => {
        return {
          id: x.id,
          members: x.members.map((xx: any) => {
            return {
              username: xx.username
            }
          })
        }
      })

      isRoom = isRoom.filter((x: any) => {
        return (
          x.members.length === 2
          && [req.body.username1, req.body.username2].includes(x.members[0].username)
          && [req.body.username1, req.body.username2].includes(x.members[1].username)
        );
      })

      if (isRoom.length) {
        return res
          .status(httpStatus.OK)
          .json({
            data: isRoom[0].id,
            message: 'Room already exists'
          })
      }

      const userRepo = getRepository(User);

      const user1 = await userRepo.findOne(req.body.username1)
      const user2 = await userRepo.findOne(req.body.username2)

      const room = await roomRepo.save(
        roomRepo.create({
          name: 'personal',
          members: [user1, user2]
        })
      )

      if (room) {
        return res
          .status(httpStatus.OK)
          .json({
            data: room.id,
            message: 'room created'
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

const getAllGroups = {

  controller: async (req: Request, res: Response) => {
    try {
      const roomRepo = getRepository(Room);

      let groups: any = await roomRepo
        .createQueryBuilder('room')
        .where('room.name != :name', { name: 'personal' })
        .getMany()

      if (groups) {
        return res
          .status(httpStatus.OK)
          .json({
            groups: groups,
            message: 'Room already exists'
          })
      }

      const userRepo = getRepository(User);

      const user1 = await userRepo.findOne(req.body.username1)
      const user2 = await userRepo.findOne(req.body.username2)

      const room = await roomRepo.save(
        roomRepo.create({
          name: 'personal',
          members: [user1, user2]
        })
      )

      if (room) {
        return res
          .status(httpStatus.OK)
          .json({
            data: room.id,
            message: 'room created'
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

const createGroup = {
  validator: celebrate({
    body: Joi.object().keys({
      username: Joi.string().required(),
      groupname: Joi.string().required(),
    })
  }),

  controller: async (req: Request, res: Response) => {
    try {

      const roomRepo = getRepository(Room);

      const isGroup = await roomRepo.findOne({
        where: { name: req.body.groupname }
      })

      if (isGroup) {
        return res
          .status(httpStatus.OK)
          .json({
            data: null,
            message: 'group already exists'
          })
      }

      const userRepo = getRepository(User);

      const user = await userRepo.findOne(req.body.username)

      const group = await roomRepo.save(
        roomRepo.create({
          name: req.body.groupname,
          members: [user]
        })
      )

      if (group) {
        return res
          .status(httpStatus.OK)
          .json({
            data: null,
            message: 'group created'
          })
      }

      throw new Error("Group not created");

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
  makeOneChat,
  getAllGroups,
  createGroup
}