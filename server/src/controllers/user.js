const { User, Art, Post, Photo } = require("../../models");
const responSuccess = "Response Success";
const Joi = require("joi");

exports.getUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password", "greeting"],
      },
      include: [
        {
          model: Post,
          as: "posts",
          attributes: { exclude: ["createdAt", "updatedAt", "userID"] },
          include: {
            model: Photo,
            as: "photos",
            attributes: { exclude: ["createdAt", "updatedAt", "postID"] },
          },
        },
        {
          model: Art,
          as: "arts",
          attributes: { exclude: ["createdAt", "updatedAt", "userID"] },
        },
      ],
    });
    res.status(200).json({
      status: "success",
      message: "Posts loaded successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.satus(500).json({
      status: "error",
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

exports.editUser = async (req, res) => {
  try {
    const { body } = req.body;
    const { id } = req.user;
    const schema = Joi.object({
      avatar: Joi.string(),
      greeting: Joi.string().min(5),
      fullname: Joi.string().min(5),
    });
    const { error } = schema.validate(body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).send({
        status: "Validation Error",
        error: {
          message: error.details.map((error) => error.message),
        },
      });
    }

    const { avatar } = req.body;

    const user = await User.update({
      where: {
        id,
      },
      ...req.body,
      avatar: req.filename,
    });

    console.log(body);
    const afterUpdate = await User.findOne({
      where: {
        id: user.id,
      },
    });

    res.send({
      status: responSuccess,
      message: "Update Success",
      data: {
        user: afterUpdate,
      },
    });
  } catch (error) {
    //error here
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.addArt = async (req, res) => {
  try {
    const { body } = req.body;
    const file = req.files;

    const schema = Joi.object({
      images: Joi.array().required(),
    });

    const { error } = schema.validate(
      { ...req.body, images: req.files },
      {
        abortEarly: false,
      }
    );

    if (error) {
      return res.status(400).send({
        status: "Validation Error",
        error: {
          message: error.details.map((error) => error.message),
        },
      });
    }

    const { images } = req.body;
    const { id: userID } = req.user;
    const art = await Art.create({
      images: req.files,
      userID,
    });

    const afterAdd = await Art.findOne({
      where: { id: art.id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userID"],
      },
    });

    res.send({
      status: responSuccess,
      message: "Arts Succesfully Added",
      data: {
        art: afterAdd,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};
