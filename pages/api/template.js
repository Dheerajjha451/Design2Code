import { mongooseConnect } from "@/lib/mongoose";
import { Template } from "@/models/Template";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === 'POST') {
    const {user, title, description, css, useCase, framework, deployedLink, repositoryLink, images} = req.body;

    const templateDoc = await Template.create({
      user, title, description, css, useCase, framework, deployedLink, repositoryLink, images
    })
    res.json(templateDoc);
  }

  if (method === 'PUT') {
    const { _id, user, title, description, css, useCase, framework, deployedLink, repositoryLink, images} = req.body;
    await Template.updateOne({_id}, {
      user, title, description, css, useCase, framework, deployedLink, repositoryLink, images
    });
    res.json(true)
  }

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Template.findOne({ _id: req.query.id }));
    } else {
      res.json(await Template.find())
    }
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Template.deleteOne({ _id: req.query.id });
      res.json(true);
    }
  }
}