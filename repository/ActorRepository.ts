
import { Actor, PrismaClient } from "@prisma/client";
import { ActorPayload } from "../types/Actor";
import logger, { Logger } from "../helper/log";

const prisma = new PrismaClient();

export default class ActorRepository {

    constructor() {}

    async list(): Promise<Actor[]> {
        try {
            const actors: Actor[] = await prisma.actor.findMany();
            return actors;
        } catch (err) {
            throw new Error("Error: list() method in ActorRepository failed.");
        }
    }

    async get(id: number): Promise<Actor | Error> {
        try {
            const actor: Actor | null = await prisma.actor.findUnique({ where: { id } });

            if (!actor) {
                return new Error(
                    "Error: get() method in ActorRepository failed."
                );
            }

            return actor;
        } catch (err) {
            return new Error("Error: get() method in ActorRepository failed.");
        }
    }

    async create(actor: ActorPayload): Promise<Actor | Error> {
      try {
        const newActor: Actor = await prisma.actor.create({data: actor})
        return newActor;
      } catch(err) {
        return new Error("Error: create() method in ActorRepository failed.");
      }
    }

    async update(actor: ActorPayload): Promise<Actor | Error> {
      try {
        const updatedActor: Actor = await prisma.actor.update({
          where: { id: actor.id },
          data: actor
        })
        return updatedActor;
      } catch(err) {
        return new Error("Error: update() method in ActorRepository failed.");
      }
    }

    async delete(id: number): Promise<Actor | Error> {
      try {
        const deletedActor: Actor = await prisma.actor.delete({
          where: { id }
        })
        return deletedActor;
      } catch(err) {
        return new Error("Error: delete() method in ActorRepository failed.");
      }
    }
}
