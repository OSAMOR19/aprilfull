"use client";

import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      lastName: "",
      firstName: "",
      email: "",
      phone: "",
      message: "",
    });
  };
  return (
    <div className="min-h-screen pt-32 md:pt-20 flex items-center justify-center dark:bg-linear-to-tl dark:from-purple-900 dark:via-gray-900 dark:to-black bg-white text-white p-8">
      <div className=" lg:min-w-2xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl text-black dark:text-white font-bold text-gray-900 text-center mb-8">
          Get in Touch
        </h1>

        {/* Form */}
        <div className=" text-black dark:text-white p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="space-y-4 flex w-full gap-4 md:gap-6 md:flex-row flex-col">
              <div className="flex-1">
                <label className="block text-sm font-medium  mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
                  placeholder="Doe"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium  mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
                  placeholder="John"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium  mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
                placeholder="john@example.com"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium  mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
                placeholder="(123) 456-7890"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium  mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition resize-none"
                placeholder="Your message here..."
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
