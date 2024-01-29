import category from "../models/category.js";

export const createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    const isExist = await category.find({ name });

    if (isExist) {
      return res.json({ msg: "Category already exists!" });
    }

    if (name || image) {
      const newCategory = new category({
        name,
        image
      });
      await newCategory.save();
      return res.json({
        category: newCategory,
        msg: "Category saved successfully!"
      });
    } else {
      return res.json({ msg: "All fields are required!" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async (req, res) => {
  try {
    const allCategory = await category.find({});

    if (allCategory.length > 0) {
      return res.json({ category: allCategory });
    } else {
      return res.json({ msg: "No category found!" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryByName = async(req, res) => {
  try{
    const {name} = req.params;
    const allCategory = await category.find({ 'name': new RegExp(name, 'i') });

    if (Object.values(allCategory).length > 0) {
      return res.json(allCategory);
    } else {
      return res.json({ msg: "No category found!" });
    }
  }catch(err){
    console.log(err)
  }
}

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const allCategory = await category.find({ id });

    if (Object.values(allCategory).length > 0) {
      return res.json({ category: allCategory });
    } else {
      return res.json({ msg: "No category found!" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    const myCategory = await category.find({ name });

    if (!isExist) {
      return res.json({ msg: "Category does not exist!" });
    }

    if (!name || !image) {
      return res.json({ msg: "All fields are required!" });
    }

    if (name) myCategory.name = name;
    if (image) myCategory.image = image;

    const updatedCategory = await myCategory.save();

    return res.json({ category: updatedCategory, msg: "Category updated successfully!" });

  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await category.deleteOne({ id }, (err, _) => {
      if (err) {
        console.log(err);
        return res.json(err);
      } else {
        return res.json({ msg: "Record deleted successfully!" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
