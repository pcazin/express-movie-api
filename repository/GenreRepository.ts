import { genres, PrismaClient } from "@prisma/client";
import { GenrePayLoad } from "../types/Genre";

const prisma = new PrismaClient();

export default class GenreRepository {
    constructor() {}

    async list(): Promise<genres[] | Error> {
        try {
            const genres: genres[] = await prisma.genres.findMany();
            return genres;
        } catch (err) {
            return new Error("Error: list() method in GenreRepository failed.");
        }
    }

    async get(id: number): Promise<genres | Error> {
        try {
            const genre: genres | null = await prisma.genres.findUnique({
                where: {
                    id,
                },
            });

            if (!genre) {
                return new Error(
                    "Error: get() method in GenreRepository failed."
                );
            }

            return genre;
        } catch (err) {
            return new Error("Error: get() method in GenreRepository failed.");
        }
    }

    async create(newGenre: GenrePayLoad): Promise<genres | Error> {
        try {
            const genre: genres = await prisma.genres.create({ data: newGenre });
            return genre;
        } catch (err) {
            return new Error(
                "Error: create() method in GenreRepository failed."
            );
        }
    }

    async update(genre: genres): Promise<genres | Error> {
        try {
            const updatedGenre: genres = await prisma.genres.update({
                where: {
                    id: genre.id,
                },
                data: genre,
            });

            return updatedGenre;
        } catch (err) {
            return new Error(
                "Error: update() method in GenreRepository failed."
            );
        }
    }

    async delete(id: number): Promise<genres | Error> {
        try {
            const deletedGenre: genres = await prisma.genres.delete({
                where: { id },
            });

            return deletedGenre;
        } catch (err) {
            return new Error(
                "Error: delete() method in GenreRepository failed."
            );
        }
    }
}


