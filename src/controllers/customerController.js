import { CustomerModel } from "../models/customerModel.js";


const validateCustomer = ({ name, email, phone }) => {
  const errors = [];

  if (!name || name.trim() === "") {
    errors.push("Nama wajib diisi");
  }
  if (!email || !email.includes("@")) {
    errors.push("Email tidak valid, harus mengandung karakter '@'");
  }
  if (!phone || phone.length < 10) {
    errors.push("Nomor telepon harus diisi minimal 10 karakter");
  }

  return errors;
};

export const CustomerController = {
async getAll(req, res) {
  try {
    const { name, page, limit } = req.query;
    const customers = await CustomerModel.getAll({ name, page, limit });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},


  async getById(req, res) {
    try {
      const customer = await CustomerModel.getById(req.params.id);
      res.json(customer);
    } catch (err) {
      res.status(404).json({
        error: err.message,
      });
    }
  },

  async create(req, res) {
  try {
    const errors = validateCustomer(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const customer = await CustomerModel.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
},

async update(req, res) {
  try {
    const errors = validateCustomer(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const customer = await CustomerModel.update(req.params.id, req.body);
    res.json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
},

  async update(req, res) {
    try {
      const customer = await CustomerModel.update(
        req.params.id,
        req.body
      );

      res.json(customer);
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  },

  async remove(req, res) {
    try {
      await CustomerModel.remove(req.params.id);

      res.json({
        message: "Customer deleted successfully",
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  },
};
