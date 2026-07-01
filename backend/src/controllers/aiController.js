const Product = require("../models/Product");

const {
  generateProjectComponents,
} = require("../services/aiService");

const generateProject = async (
  req,
  res,
  next
) => {
  try {
    const { project } = req.body;

    if (!project) {
      return res.status(400).json({
        success: false,
        message: "Project name is required",
      });
    }

    // Generate AI response
    const result =
      await generateProjectComponents(project);

    

    // Search marketplace for every component
    const components = await Promise.all(
      result.components.map(async (component) => {
        const searchQueries =
          component.searchKeywords
            .filter(Boolean)
            .map((keyword) => ({
              $or: [
                {
                  title: {
                    $regex: keyword,
                    $options: "i",
                  },
                },
                {
                  description: {
                    $regex: keyword,
                    $options: "i",
                  },
                },
              ],
            }));

        if (searchQueries.length === 0) {
          return {
            ...component,
            products: [],
          };
        }

        const products = await Product.find({
          $and: [
            {
              $or: searchQueries.flatMap(
                (query) => query.$or
              ),
            },
            {
              status: "Available",
            },
          ],
        })
          .populate(
            "seller",
            "name whatsappNumber"
          )
          .populate("category", "name");

        return {
          ...component,
          products,
        };
      })
    );

    result.components = components;

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateProject,
};