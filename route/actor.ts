import {
    get_actor_list,
    get_actor,
    create_actor,
    update_actor,
    delete_actor,
} from "../controller/ActorController";

import express, { Router } from "express";

const router: Router = express.Router();

router.get("/", get_actor_list);

router.get("/:id", get_actor);

router.post("/", create_actor);

router.put("/:id", update_actor);

router.delete("/:id", delete_actor);

export default router;


