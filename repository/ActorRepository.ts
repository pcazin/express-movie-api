
import { actors, PrismaClient } from "@prisma/client";
import { ActorPayload } from "../types/Actor";

const prisma = new PrismaClient();

export default class ActorRepository {

    constructor() {}

    async list(): Promise<actors[]> {
        try {
            const actors: actors[] = await prisma.actors.findMany();
            return actors;
        } catch (err) {
            throw new Error("Error: list() method in ActorRepository failed.");
        }
    }

    async get(id: number): Promise<actors | Error> {
        try {
            const actor: actors | null = await prisma.actors.findUnique({ where: { id } });

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

    async create(actor: ActorPayload): Promise<actors | Error> {
      try {
        const newActor: actors = await prisma.actors.create({data: actor})
        return newActor;
      } catch(err) {
        return new Error("Error: create() method in ActorRepository failed.");
      }
    }

    async update(actor: ActorPayload): Promise<actors | Error> {
      try {
        const updatedActor: actors = await prisma.actors.update({
          where: { id: actor.id },
          data: actor
        })
        return updatedActor;
      } catch(err) {
        return new Error("Error: update() method in ActorRepository failed.");
      }
    }

    async delete(id: number): Promise<actors | Error> {
      try {
        const deletedActor: actors = await prisma.actors.delete({
          where: { id }
        })
        return deletedActor;
      } catch(err) {
        return new Error("Error: delete() method in ActorRepository failed.");
      }
    }
}
