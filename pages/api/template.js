import { mongooseConnect } from "@/lib/mongoose";
import { Template } from "@/models/Template.model";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300, checkperiod: 320 }); // Cache TTL set to 5 minutes

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === 'POST') {
    const { user, title, description, css, useCase, framework, deployedLink, repositoryLink, images } = req.body;

    const templateDoc = await Template.create({
      user, title, description, css, useCase, framework, deployedLink, repositoryLink, images
    });
    
    // Invalidate cache for the template list
    cache.del("allTemplates");

    res.json(templateDoc);
  }

  if (method === 'PUT') {
    const { _id, user, title, description, css, useCase, framework, deployedLink, repositoryLink, images } = req.body;
    await Template.updateOne({ _id }, {
      user, title, description, css, useCase, framework, deployedLink, repositoryLink, images
    });
    
    // Invalidate cache for the updated template and the template list
    cache.del("allTemplates");
    cache.del(`template_${_id}`);

    res.json(true);
  }

  if (method === 'GET') {
    if (req.query?.id) {
      const cacheKey = `template_${req.query.id}`;
      let template = cache.get(cacheKey);

      if (!template) {
        template = await Template.findOne({ _id: req.query.id });
        cache.set(cacheKey, template);
      }

      res.json(template);
    } else {
      const cacheKey = "allTemplates";
      let templates = cache.get(cacheKey);

      if (!templates) {
        templates = await Template.find();
        cache.set(cacheKey, templates);
      }

      res.json(templates);
    }
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Template.deleteOne({ _id: req.query.id });
      
      // Invalidate cache for the deleted template and the template list
      cache.del("allTemplates");
      cache.del(`template_${req.query.id}`);

      res.json(true);
    }
  }
}
