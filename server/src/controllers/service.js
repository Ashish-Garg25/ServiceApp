import Services from "../models/serivce.js";
import UserModel from "../models/user.js";

export const createService = async (req, res) => {
  try {
    const { userId } = req.user;
    const { name, image, serviceCategory, about, availaility, rate } = req.body;

    const service = await Services.find({ user: userId });

    if (service?.length > 2) {
      return res
        .status(404)
        .json({ msg: "You have reached the service limit!" });
    }

    const newService = new Services({
      user: userId,
      name,
      image,
      serviceCategory,
      about,
      availaility,
      rate
    });

    await newService.save();

    return res.json({
      message: "Service created successfully",
      variant: "success",
      data: newService
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "Something went wrong!" });
  }
};

export const getServices = async (req, res) => {
  try {
    const services = await Services.find({});
    if (services.length > 0) {
      res.status(201).json({ services });
    } else {
      res.status(404).json({ msg: "No service found!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Something went wrong!" });
  }
};

export const getServiceBySellerId = async (req, res) => {
  try {
    const { userId } = req.user;
    const service = await Services.find({ user: userId });

    if (!service) {
      res.status(404).json({ msg: "No service found for this user!" });
    }

    res.status(202).json(service);
  } catch (err) {
    console.log(err);
  }
};

export const getServicesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const services = await Services.find({ serviceCategory: category });
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

export const getFilteredService = async (req, res) => {
  try {
    const { Category, Rating, Earning, Radius } = req.query;

    console.log(req.query);

    const services = await Services.find({ serviceCategory: Category });
    if (services.length > 0) {
      let serviceWithDetails = await Promise.all(
        services.map(async (service) => {
          const originalPoster = await UserModel.findById(service.user);
          return { service, originalPoster };
        })
      );

      console.log("rrr", serviceWithDetails);
      // Filter services based on Rating
      if (Rating) {
        serviceWithDetails = serviceWithDetails.filter(
          (item) => item.originalPoster.rating >= Rating
        );
      }

      console.log("eee", serviceWithDetails);

      // Filter services based on Earning
      if (Earning) {
        serviceWithDetails = serviceWithDetails.filter(
          (item) => item.originalPoster.earning >= Earning
        );
      }

      console.log("rara", serviceWithDetails);

      // Filter services based on Radius
      if (Radius) {
        const maxDistance = parseInt(Radius) * 1000;
        const coordinates = [
          serviceWithDetails[0].originalPoster.location.latitude,
          serviceWithDetails[0].originalPoster.location.longitude
        ];

        serviceWithDetails = serviceWithDetails.filter((item) => {
          const distance = calculateDistance(
            coordinates[0],
            coordinates[1],
            item.originalPoster.location.latitude,
            item.originalPoster.location.longitude
          );

          return distance <= maxDistance;
        });
      }

      if (serviceWithDetails.length > 0) {
        res.status(200).json(serviceWithDetails);
      } else {
        res
          .status(404)
          .json({ msg: "No service found for selected criteria!" });
      }
    } else {
      res.status(404).json({ msg: "No service found for selected category!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "Something went wrong!" });
  }
};

export const getSingleService = async (req, res) => {
  console.log("rrrr", req.params);
  try {
    const { id } = req.params;

    const service = await Services.findById(id);
    if (service) {
      const originalPoster = await UserModel.findById(service.user);
      const serviceDetails = { service, originalPoster };
      console.log(serviceDetails);
      res.status(202).json(serviceDetails);
    } else {
      res.status(404).json({ msg: "No service found!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Something went wrong!" });
  }
};

export const updateService = async (req, res) => {
  try {
    const { _id, name, image, serviceCategory, about, availaility, rate } =
      req.body;

    const service = await Services.updateOne(
      { _id: _id },
      { $set: { name, image, serviceCategory, about, availaility, rate } }
    );

    if (service.matchedCount > 0) {
      const updatedService = await Services.findById(_id);
      return res.json({
        message: "Service updated successfully",
        variant: "success",
        data: updatedService
      });
    } else {
      return res.status(400).json({ msg: "Service does not exist!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "Something went wrong!" });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Services.deleteOne({ _id });

    if (response.deletedCount > 0) {
      return res.json({
        message: "Service deleted successfully",
        variant: "success"
      });
    } else {
      return res.status(400).json({ msg: "Service does not exist!" });
    }
  } catch (err) {
    console.log(err);
  }
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in kilometers

  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
