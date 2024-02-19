import ContactForm from "../models/ContactFromModel.js"

export const sendContactForm = async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  try {
    const newContactForm = new ContactForm({ firstName, lastName, email, message });
    await newContactForm.save();

    res.status(201).send("Message sent and saved!");
  } catch (error) {
    res.status(500).send("Error while sending or saving the message: " + error.message);
  }

  console.log("Received Form Data:", { firstName, lastName, email, message });
};
