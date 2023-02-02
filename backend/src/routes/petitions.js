const express = require("express");
const router = express.Router();
const petitionsModel = require("../models/petitions.model");
const signaturesModel = require("../models/signatures.model");
const favoritesModel = require("../models/favorites.model");
const petitionsValidation = require("../validation/petitions.validation");
const authMiddleware = require("../middleware/auth.middleware");
const CustomResponse = require("../classes/CustomResponse");

const multer = require("../config/multerTypes");
const {promises: fs} = require("fs");
const path = require('path')
const uploadMulter = multer.createMulter("uploads/", 3000000, {
  type: multer.allowedTypes.img,
});

router.post("/create", authMiddleware, uploadMulter.single("image"), async (req, res) => {
  try {
    console.log(req.file, req.body);
    const validatedValue = await petitionsValidation.validateNewPetitionSchema(
        req.body
    );

    await petitionsModel.createPetition(
        {
          title: validatedValue.title,
          description: validatedValue.description,
          image: req?.file?.filename,
          goal: validatedValue.goal,
          userId: req.userData._id
        }
    );

    res.json(
        new CustomResponse(CustomResponse.STATUSES.success, "new petition created")
    );
  } catch (err) {
    console.error("err", err);
    await fs.unlink(req.file.path);
    res.status(401).json(err);
  }
});

router.get("/petition/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error("not found");
    }
    const petition = await petitionsModel.selectPetitionById(
      req.params.id,
    ) || {};

    const result = {
      title: petition.title,
      description: petition.description,
      image: petition.image,
      goal: petition.goal,
      performance: petition.performance,
      performanceRate: petition.performance / petition.goal * 100,
      _id: petition._id,
    }

    res.json(result);
  } catch (err) {
    console.error("err", err);
    res.status(401).json(err);
  }
});

router.post("/update/:id", authMiddleware, uploadMulter.single("image"), async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error("error");
    }

    const validatedValue = await petitionsValidation.validateNewPetitionSchema(req.body);

    const card = await petitionsModel.updatePetition({
      id: req.params.id,
      title: validatedValue.title,
      description: validatedValue.description,
      image: req?.file?.filename,
      goal: validatedValue.goal,
      userId: req.userData._id
    });
    res.json(card);
  } catch (err) {
    console.error("err", err);
    res.status(401).json(err);
  }
});

router.delete("/petition/:id", authMiddleware, async (req, res) => {
  try {
    if (!req.body) {
      throw new CustomResponse(CustomResponse.STATUSES.fail, "invalid petition id");
    }
    const petition = await petitionsModel.deletePetition(req.params.id, req.userData._id);
    if (petition?.image) {
      const filePath = path.resolve(__dirname, '../../uploads', petition?.image);
      await fs.unlink(filePath);
    }
    res.json(petition);
  } catch (err) {
    console.error("err", err);
    res.status(401).json(err);
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const petitions = await petitionsModel.getMyPetitions(req.userData._id);
    const signatures = await signaturesModel.getMySignatures(req.userData._id);

    const petitionsSigned = []
    for (const signature of signatures) {
      const p = await petitionsModel.selectPetitionById(signature.petitionId)
      if (p) {
        petitionsSigned.push({
          _id: p._id,
          title: p.title,
          description: p.description,
          image: p.image,
          goal: p.goal,
          performance: p.performance,
          favorites:  p.favorites,
          userId: p.userId,
          victory: p.victory,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
        })
      }
    }

    const petitionsFavorites = []
    const favorites = await favoritesModel.getMyFavorites(req.userData._id, true);
    for (const favorite of favorites) {
      const p = await petitionsModel.selectPetitionById(favorite.petitionId)
      if (p) {
        petitionsFavorites.push({
          _id: p._id,
          title: p.title,
          description: p.description,
          image: p.image,
          goal: p.goal,
          performance: p.performance,
          favorites:  p.favorites,
          userId: p.userId,
          victory: p.victory,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
        })
      }
    }

    res.json({
      started: petitions,
      signed: petitionsSigned,
      favorites: petitionsFavorites,
    });
  } catch (err) {
    console.error("err", err);
    res.status(401).json(err);
  }
});

router.get("/all", async (req, res) => {
  try {
    const petitions = await petitionsModel.getPetitions();
    res.json(petitions);
  } catch (err) {
    console.error("err", err);
    res.status(401).json(err);
  }
});

router.get("/search", async (req, res) => {
  try {
    if (!req?.query?.q) {
      return []
    }

    const petitions = await petitionsModel.searchPetitions(
        req.query.q
    );

    res.json(petitions);
  } catch (err) {
    console.error("err", err);
    res.status(401).json(err);
  }
});

router.get("/victories", async (req, res) => {
  try {
    const victories = await petitionsModel.getVictories();
    res.json(victories);
  } catch (err) {
    console.error("err", err);
    res.status(401).json(err);
  }
});

module.exports = router;
