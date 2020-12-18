const { Project, ProjectFiles, Hired } = require("../../models");
const responSuccess = "Response Success";
const Joi = require("joi");

exports.sendProject = async (req, res) => {
  try {
    const { id: hiredID } = req.params;
    const { id: userID } = req.user;
    const hired = await Hired.findOne({
      where: { id: hiredID },
    });
    if (!hired) {
      return res.status(404).send({
        status: `Hired With id: ${id} Not Found`,
        data: null,
      });
    }
    if (hired.orderTo !== userID) {
      return res.status(400).send({
        status: status,
        message: "access denied",
        data: {},
      });
    }
    const { body } = req.body;
    const scema = Joi.object({
      description: Joi.string().min(8).required(),
    });
    const { error } = schema.validate(
      { ...req.body },
      {
        abortEarly: false,
      }
    );
    const project = await Project.create({
      description: body.description,
      hiredID,
    });
    res.send({
      status: responseSuccess,
      message: "succesfully send project",
      data: {
        project: {
          id: project.id,
          description: project.description,
          hiredID,
        },
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

exports.addProjectFiles = async (req, res) => {
  try {
    const { id: projectID } = req.params;
    const file = req.files;
    const project = await Project.findOne({ where: { id: projectID } });
    if (!project) {
      return res.status(404).send({
        status: `Project With id: ${id} Not Found`,
        data: null,
      });
    }
    await Promise.all(
      file.map(async (image) => {
        await ProjectFiles.create({
          projectID,
          fileName: image.path,
        });
      })
    );
    const afterAdd = await Project.findOne({
      where: { id: projectID },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: ProjectFiles,
        as: "files",
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    });

    res.send({
      status: responseSuccess,
      message: "Succesfully add Files",
      data: { project: afterAdd },
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

exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findOne({
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: ProjectFiles,
        as: "files",
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    });
    if (!project) {
      return res.status(404).send({
        status: `Project With id: ${id} Not Found`,
        data: null,
      });
    }

    res.send({
      status: responseSuccess,
      message: "Succesfully Get Project",
      data: { project },
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
