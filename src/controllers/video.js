const Video = require("../models/Video");
const { videoSchema } = require("../validators/video");

exports.getAll = async (req, res) => {
  try {
    Video.find({})
      .exec()
      .then(async (videos) => {
        const status = videos && videos.length > 0 ? 200 : 204;

        return res.status(status).send(videos);
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;

    Video.findOne({ _id: id })
      .exec()
      .then(async (video) => {
        const status = video ? 200 : 204;

        return res.status(status).send(video);
      });
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
};

exports.getByCategoria = async (req, res) => {
  try {
    const categoriaId = req.params.id;

    Video.find({ categoriaId: categoriaId })
    .then(async (videos) => {
      const status = videos && videos.length > 0 ? 200 : 204;

      return res.status(status).send(videos);
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
};

exports.criarVideo = async (req, res) => {
  try {
    console.log(req.body);
    // 1 - Checar se o corpo da requisição é válido
    const validatedVideo = await videoSchema.validate(req.body);

    // 2 - Buscar a partir da urlVideo se esse video já existe no nosso banco
    return Video.findOne({ urlVideo: validatedVideo.urlVideo }).then(
      async (existingVideo) => {
        let newVideo;
        // 3- Caso esse Video não esteja no nosso banco, criar ele na coleção Videos e salvar
        console.log(existingVideo);
        if (!existingVideo) {
          // Criando um novo Video
          newVideo = new Video(validatedVideo);
          // Salvando
          newVideo
            .save()
            .then((newVideo) => {
              return res.status(201).json(newVideo);
            })
            .catch((e) => {
              console.log(e);
              // Retornando a nossa função mais cedo caso haja um erro ao salvar o Video
              return res.status(303).json({
                errors: ["Houve um erro ao criar uma entrada na tabela "],
              });
            });
        } else {
          //Se o Video já existir
          return res
            .status(409)
            .json({ mensagem: "Esse video já está cadastrado." });
        }
      }
    );
  } catch (e) {
    // Retornando erro de validação
    console.log({ e });
    return res.status(200).json(e);
  }
};
