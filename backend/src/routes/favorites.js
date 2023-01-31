const express = require("express");
const router = express.Router();
const favoritesModel = require("../models/favorites.model");
const petitionsModel = require("../models/petitions.model");
const favoritesValidation = require("../validation/favorites.validation");
const CustomResponse = require("../classes/CustomResponse");
const loggedinMiddleware = require("../middleware/loggedin.middleware");

router.post("/create", loggedinMiddleware, async (req, res) => {
    try {
        const validatedValue = await favoritesValidation.validateFavoriteSchema(
            req.body
        );

        if (validatedValue.shouldIncrease) {
            await petitionsModel.increaseFavorites(validatedValue.petitionId)
        }

        if (req.userData?._id) {
            await favoritesModel.createUpdateFavorite(
                {
                    favorite: validatedValue.value,
                    userId: req.userData?._id,
                    petitionId: validatedValue.petitionId,
                }
            );
        }

        res.json(
            new CustomResponse(CustomResponse.STATUSES.success, "new favorites created / updated")
        );
    } catch (err) {
        console.error("err", err);
        res.status(401).json(err);
    }
});

module.exports = router;
