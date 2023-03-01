const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Pet, Background, UserItem } = require ("../../db/models");

const { validateQuery } = require("../../utils/validation");
const { petImageParser, bgImageParser } = require("../../utils/petBgImgParser");

const { Op } = require("sequelize");

const router = express.Router();

// GET /api/petbg/current - get users active pet and bg
router.get("/current", requireAuth, async (req, res, next) => {
    const { user } = req;

    const err = {};
    if (!user) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found";
        err.message = "User could not be found";
        return next(err);
    }

    const activePetId = user.activePet;
    const activeBgId = user.activeBg;

    const activePet = await Pet.findByPk(activePetId);
    const activeBg = await Background.findByPk(activeBgId);

    if (!activePet) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found";
        err.message = "Pet could not be found";
        return next(err);
    }

    if (!activeBg) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found";
        err.message = "Background could not be found";
        return next(err);
    }

    res.json({
        user,
        activePet,
        activeBg
    })
})

// GET /api/petbg/current/all - get all users pets and bgs
router.get("/current/all", requireAuth, async (req, res, next) => {
    const { user } = req;

    const err = {};
    if (!user) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found";
        err.message = "User could not be found";
        return next(err);
    }

    const activePetId = user.activePet;
    const activeBgId = user.activeBg;

    const activePet = await Pet.findByPk(activePetId);
    const activeBg = await Background.findByPk(activeBgId);

    if (!activePet) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found";
        err.message = "Pet could not be found";
        return next(err);
    }

    const randomNum = Math.floor(Math.random() * 10) + 1;
    if (activePet.health > 80) {

        if (activePet.friendliness >= 80) {
            await activePet.update({
                petImageUrl: petImageParser(activePet.flavor, "happy")
            })
        } else if (activePet.friendliness >= 60) {
            await activePet.update({
                petImageUrl: petImageParser(activePet.flavor, "normal")
            })
        } else if (activePet.friendliness >= 30) {
            await activePet.update({
                petImageUrl: petImageParser(activePet.flavor, "unimpressed")
            })
        } else {
            if (randomNum > 5) {
                await activePet.update({
                    petImageUrl: petImageParser(activePet.flavor, "angry")
                })
            } else {
                await activePet.update({
                    petImageUrl: petImageParser(activePet.flavor, "sad")
                })
            }
        }
    } else if (activePet.health > 60) {
        if (activePet.friendliness >= 80) {
            await activePet.update({
                petImageUrl: petImageParser(activePet.flavor, "happy")
            })
        } else if (activePet.friendliness >= 50) {
            if (randomNum > 5) {
                await activePet.update({
                    petImageUrl: petImageParser(activePet.flavor, "normal")
                })
            } else {
                await activePet.update({
                    petImageUrl: petImageParser(activePet.flavor, "unimpressed")
                })
            }
        } else if (activePet.friendliness >= 30) {
            if (randomNum > 5) {
                await activePet.update({
                    petImageUrl: petImageParser(activePet.flavor, "angry")
                })
            } else {
                await activePet.update({
                    petImageUrl: petImageParser(activePet.flavor, "unimpressed")
                })
            }
        } else {
            if (randomNum > 5) {
                await activePet.update({
                    petImageUrl: petImageParser(activePet.flavor, "angry")
                })
            } else {
                await activePet.update({
                    petImageUrl: petImageParser(activePet.flavor, "sad")
                })
            }
        }
    } else if (activePet.health > 30) {
        if (activePet.friendliness >= 80) {
            if (randomNum > 5) {
                await activePet.update({
                    petImageUrl: petImageParser(activePet.flavor, "normal")
                })
            } else {
                await activePet.update({
                    petImageUrl: petImageParser(activePet.flavor, "happy")
                })
            }
        } else if (activePet.friendliness >= 50) {
            if (randomNum > 5) {
                await activePet.update({
                    petImageUrl: petImageParser(activePet.flavor, "normal")
                })
            } else {
                await activePet.update({
                    petImageUrl: petImageParser(activePet.flavor, "unimpressed")
                })
            }
        } else {
            await activePet.update({
                petImageUrl: petImageParser(activePet.flavor, "angry")
            })
        }
    } else {
        if (activePet.friendliness >= 80) {
            if (randomNum > 5) {
                await activePet.update({
                    petImageUrl: petImageParser(activePet.flavor, "normal")
                })
            } else {
                await activePet.update({
                    petImageUrl: petImageParser(activePet.flavor, "unimpressed")
                })
            }
        } else if (activePet.friendliness >= 50) {
            if (randomNum > 5) {
                await activePet.update({
                    petImageUrl: petImageParser(activePet.flavor, "angry")
                })
            } else {
                await activePet.update({
                    petImageUrl: petImageParser(activePet.flavor, "unimpressed")
                })
            }
        } else {
            await activePet.update({
                petImageUrl: petImageParser(activePet.flavor, "angry")
            })
        }
    }

    if (!activeBg) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found";
        err.message = "Background could not be found";
        return next(err);
    }

    const allPetIds = await UserItem.findAll({
        where: {
            userId: user.id,
            itemType: "pet"
        },
        attributes: ["id"]
    });

    // console.log("ALL PET IDS >>>>>>>> \N", allPetIds);
    const petUserItemIds = [];
    allPetIds.forEach(item => petUserItemIds.push(item.id));

    const allBgIds = await UserItem.findAll({
        where: {
            userId: user.id,
            itemType: "background"
        },
        attributes: ["id"]
    });

    const bgUserItemIds = [];
    allBgIds.forEach(item => bgUserItemIds.push(item.id));

    const allPets = await Pet.findAll({
        where: {
            userItemId: {
                [Op.in]: petUserItemIds
            }
        }
    });

    const allBgs = await Background.findAll({
        where: {
            userItemId: {
                [Op.in]: bgUserItemIds
            }
        }
    });

    // console.log("ALL PETS", allPets)

    res.json({
        user,
        activePet,
        activeBg,
        pets: allPets,
        bgs: allBgs
    })
})

// POST /api/petbg/pet - create pet for user
router.post("/pet", requireAuth, async (req, res, next) => {
    const { user } = req;

    const { name, flavor, setActive } = req.body;
    // console.log(name, "\n", flavor, "\n", setActive, "\n\n\n");

    const err = {};
    if (!user) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found";
        err.message = "User could not be found";
        return next(err);
    }

    const petUserItem = await user.createUserItem({
        itemType: "pet"
    });

    const newPet = await Pet.create({
        name,
        flavor,
        userItemId: petUserItem.id,
        petImageUrl: petImageParser(flavor, "normal")
    })

    if (setActive === true) {
        user.activePet = newPet.id;
        await user.save();
    }

    return res.json({
        user,
        pet: newPet,
        userItem: petUserItem
    })
})

// POST /api/petbg/bg - create bg for user
router.post("/bg", requireAuth, async (req, res, next) => {
    const { user } = req;

    const { bgName, setActive } = req.body;

    const err = {};
    if (!user) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found";
        err.message = "User could not be found";
        return next(err);
    }

    const bgUserItem = await user.createUserItem({
        itemType: "background"
    });

    const newBg = await Background.create({
        bgName,
        userItemId: bgUserItem.id,
        bgImageUrl: bgImageParser(bgName)
    })

    // console.log("newBg", newBg)

    if (setActive === true) {
        user.activeBg = newBg.id;
        await user.save();
    }

    return res.json({
        user,
        background: newBg,
        userItem: bgUserItem
    })
})

// PUT /api/petbg/pet/:petId - change pet info for user
router.put("/pet/:petId", requireAuth, async (req, res, next) => {
    const { user } = req;

    const petId = req.params.petId;


    const updatePet = await Pet.findByPk(petId);

    const updatePetUserItem = await UserItem.findByPk(updatePet.userItemId);

    const err = {};

    if (user.id !== updatePetUserItem.userId) {
        err.title = "Forbidden";
        err.status = 403;
        err.statusCode = 403;
        err.message = "Forbidden: cannot edit a pet that is not yours";
        return next(err);
    }

    if (!updatePet) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found";
        err.message = "Pet could not be found";
        return next(err);
    }

    const { name, health, friendliness } = req.body;

    await updatePet.update({
        name: name,
        health: health,
        friendliness: friendliness
    })

    res.json(updatePet)

});

// PUT /api/petbg/pet/:userId/:petId - change active pet for user
router.put("/pet/:userId/:petId", requireAuth, async (req, res, next) => {
    const { user } = req;
    const { userId, petId } = req.params;

    const pet = await Pet.findByPk(petId);
    const petUserItem = await UserItem.findByPk(pet.userItemId);

    const err = {};
    if (user.id !== petUserItem.userId) {
        err.title = "Forbidden";
        err.status = 403;
        err.statusCode = 403;
        err.message = "Forbidden: cannot edit a pet that is not yours";
        return next(err);
    }

    await user.update({
        activePet: petId
    });

    res.json(pet);

    // res.json({
    //     user,
    //     pet
    // });

})

// PUT /api/petbg/bg/:bgId - change active bg for user
router.put("/bg/:userId/:bgId", requireAuth, async (req, res, next) => {
    const { user } = req;
    const { userId, bgId } = req.params;

    const bg = await Background.findByPk(bgId);
    const bgUserItem = await UserItem.findByPk(bg.userItemId);

    const err = {};
    if (user.id !== bgUserItem.userId) {
        err.title = "Forbidden";
        err.status = 403;
        err.statusCode = 403;
        err.message = "Forbidden: cannot edit a background that is not yours";
        return next(err);
    }

    await user.update({
        activeBg: bgId
    });


    res.json(bg);

})

// DELETE /api/petbg/pet/:petId - remove pet from user's inventory T_T
router.delete("/pet/:petId", requireAuth, async (req, res, next) => {
    const { user } = req;

    const petId = req.params.petId;

    const deletePet = await Pet.findByPk(petId);
    const deletePetItem = await UserItem.findByPk(deletePet.userItemId);

    const err = {};
    if (!deletePet) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found";
        err.message = "Pet could not be found";
        return next(err);
    }

    if (user.id !== deletePetItem.userId) {
        err.title = "Forbidden";
        err.status = 403;
        err.statusCode = 403;
        err.message = "Forbidden: cannot delete a pet that is not yours";
        return next(err);
    }

    await deletePet.destroy();

    res.json({
        message: "Successfully deleted",
        statusCode: 200,
    });
});

// DELETE /api/petbg/bg/:bgId - remove bg from user's inventory T_T
router.delete("/bg/:bgId", requireAuth, async (req, res, next) => {
    const { user } = req;

    const bgId = req.params.bgId;

    const deleteBg = await Background.findByPk(bgId);
    const deleteBgItem = await UserItem.findByPk(deleteBg.userItemId);

    const err = {};
    if (!deleteBg) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found";
        err.message = "Background could not be found";
        return next(err);
    }

    if (user.id !== deleteBgItem.userId) {
        err.title = "Forbidden";
        err.status = 403;
        err.statusCode = 403;
        err.message = "Forbidden: cannot delete a background that is not yours";
        return next(err);
    }

    await deleteBg.destroy();

    res.json({
        message: "Successfully deleted",
        statusCode: 200,
    });
});

module.exports = router;
