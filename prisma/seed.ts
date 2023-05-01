import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new genre entity
async function createGenre() {
    const genre = await prisma.genre.create({
        data: {
            name: "Action",
        },
    });
    console.log(`Created default data for genre: ${genre.name}`);
}

// Create a new actor entity
async function createActor() {
    const actor = await prisma.actor.create({
        data: {
            first_name: "Arnold",
            last_name: "Schwarzenegger",
            date_of_birth: new Date(1947, 6, 30),
        },
    });
    console.log(`Created default data for actor: ${actor.first_name}`);
}

// Create a new film entity
async function createFilm() {
    const film = await prisma.film.create({
        data: {
            name: "Terminator 2: Judgment Day",
            synopsis:
                "A cyborg assassin is sent back in time to protect John Connor",
            release_year: 1991,
            genre: {
                connect: { id: 1 },
            },
        },
    });
    console.log(`Created default data for film: ${film.name}`);
}

// Create a new filmActor entity
async function createFilmActor() {
    const filmActor = await prisma.filmActor.create({
        data: {
            film: {
                connect: { id: 1 },
            },
            actor: {
                connect: { id: 1 },
            },
        },
    });
    console.log(
        `Created default data for film_actor: actor_id = ${filmActor.actorId} - film_id = ${filmActor.filmId}`
    );
}

// Call each function to create an entity in the database for each model
async function main() {
    await createGenre();
    await createActor();
    await createFilm();
    await createFilmActor();
}

main()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
