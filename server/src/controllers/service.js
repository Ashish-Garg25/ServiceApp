import ServiceModel from "../models/serivce.js";
import UserModel from "../models/user.js";

export const getServices = async (req, res) => {
  try {
    const services = await ServiceModel.find({});
    if (services.length > 0) {
      res.status(202).json({ services });
    } else {
      res.status(404).json({ msg: "No service found!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Something went wrong!" });
  }
};

export const getServicesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const services = await ServiceModel.find({ serviceCategory: category });
    if (services.length > 0) {
      const serviceWithDetails = await Promise.all(
        services.map(async (service) => {
          const originalPoster = await UserModel.findById(service.user); // Assuming there's a UserModel for user details
          // Attach user details to the service object
          return { service, originalPoster };
        })
      );

      res.status(202).json(serviceWithDetails);
    } else {
      res.status(404).json({ msg: "No service found for selected category!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Something went wrong!" });
  }
};

export const getSingleService = async (req, res) => {
    console.log('rrrr', req.params)
  try {
    const { id } = req.params;

    const service = await ServiceModel.findById(id);
    if (service) {
        const originalPoster = await UserModel.findById(service.user);
        const serviceDetails = {service, originalPoster};
        console.log(serviceDetails)
      res.status(202).json(serviceDetails);
    } else {
      res.status(404).json({ msg: "No service found!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Something went wrong!" });
  }
};
