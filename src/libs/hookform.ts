import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email address" }).email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Please enter your password" }).min(8, { message: 'Password must be at least 8 characters in length' }),
});


export const registerSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email address" }).email({ message: "Please enter a valid email address" }),
  fullname: z.string().min(1, { message: "Please enter your firstname" }).min(3, { message: 'First name should not be less than 3 characters' }),
  password: z.string().min(1, { message: "Please enter your password" }).min(8, { message: 'Passwords must be at least 8 characters in length' }),
  cpassword: z.string().min(1, { message: "Please confirm your password" }).min(8, { message: 'Passwords must be at least 8 characters in length' }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email address" }).email({ message: "Please enter a valid email address" }),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(1, { message: "Please enter your password" }).min(8, { message: 'Password must be at least 8 characters in length' }),
  confirmpassword: z.string().min(1, { message: "Please enter your confirmation password" }).min(8, { message: 'Password must be at least 8 characters in length' }),
});

export const contactSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email address" }).email({ message: "Please enter a valid email address" }),
  name: z.string().min(1, { message: "Please enter your name" }),
  message: z.string().min(1, { message: "Please enter your message" }).min(25, { message: "Message must be at least 25 characters" }),
  subject: z.string().min(1, { message: "Please enter a subject" }).min(4, { message: 'Subject must be at least 4 characters' })
});

export const headingSchema = z.object({
  fname: z.string().min(1, { message: "Please enter your first name" }).regex(/^[a-zA-Z\s'_-]+$/, 'First name contains invalid characters'),
  lname: z.string().min(1, { message: "Please enter your last name" }).regex(/^[a-zA-Z\s'_-]+$/, 'Last name contains invalid characters'),
  profession: z.string().min(1, { message: "Please enter your profession" }),
  city: z.string().min(1, { message: "Please enter your city name" }).regex(/^[a-zA-Z\s'_-]+$/, 'City contains invalid characters'),
  country: z.string().min(1, { message: "Please enter your country name" }),
  postalcode: z.string(),
  phone: z.string().min(1, { message: "Please enter your phone number" }),
  twitter: z.string(),
  linkedIn: z.string(),
  portfolio: z.string(),
  email: z.string().min(1, { message: "Please enter your email address" }).email({ message: "Please enter a valid email address" }),
})
export const workExperienceSchema = z.object({
  title: z.string().min(1, { message: "Please enter your job title" }).regex(/^[a-zA-Z\s'_-]+$/, 'First name contains invalid characters'),
  employer: z.string().min(1, { message: "Please enter your place of work" }),
  city: z.string().min(1, { message: "Please enter city name of employer" }).regex(/^[a-zA-Z\s'_-]+$/, 'City contains invalid characters'),
  country: z.string().min(1, { message: "Please enter country name of employer" }),
  startDate: z.string().min(1, { message: "Please enter start date" }),
  endDate: z.string(),
})
export const educationSchema = z.object({
  school: z.string().min(1, { message: "Please enter school name" }),
  location: z.string().min(1, { message: "Please enter location of school" }),
  degree: z.string().min(1, { message: "Please enter degree name" }),
  field: z.string().min(1, { message: "Please enter field of study" }),
  startDate: z.string().min(1, { message: "Please enter start date" }),
  endDate: z.string(),
})

export const detailsSchema = z.object({
  firstname: z.string().min(1, { message: "Please enter your first name" }).regex(/^[a-zA-Z\s'_-]+$/, 'First name contains invalid characters'),
  lastname: z.string().min(1, { message: "Please enter your last name" }).regex(/^[a-zA-Z\s'_-]+$/, 'Last name contains invalid characters'),
})


export const changePasswordSchema = z.object({
  password: z.string().min(1, { message: "Please enter your password" }).min(8, { message: 'Password must be at least 8 characters in length' }),
  newPassword: z.string().min(1, { message: "Please create a new password" }).min(8, { message: 'Password must be at least 8 characters in length' }),
  confirmPassword: z.string().min(1, { message: "Please confirm your new password" }).min(8, { message: 'Password must be at least 8 characters in length' }),
})

export const productSchema = z.object({
  name: z.string().min(1, { message: "Please enter name of product" }).min(3, { message: 'First name should not be less than 3 characters' }),
  price: z.string().min(1, { message: "Please enter price of product" }),
  category: z.string().min(1, { message: "Please select the category of product" }),
  store: z.string().min(1, { message: "Please select the store where product can be found" }),
  short_desc: z.string().min(1, { message: "Please enter short description of product" }).min(25, { message: 'Short description should not be less than 25 characters' }),
  long_desc: z.string()
});

export const withdrawSchema = z.object({
  address: z.string().min(1, { message: "Please enter address to withdraw funds to" }).min(30, { message: "Please enter a valid withdrawal address" }),
  amount: z.string().min(1, { message: "Please enter an amount to withdraw" }),
});