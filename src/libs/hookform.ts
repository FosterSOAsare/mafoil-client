import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email address" }).email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Please enter your password" }).min(8, { message: 'Password must be at least 8 characters in length' }),
});


export const registerSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email address" }).email({ message: "Please enter a valid email address" }),
  fullname: z.string().min(1, { message: "Please enter your fullname" }).min(3, { message: 'Full name should not be less than 3 characters' }),
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

export const changePasswordSchema = z.object({
  oldpassword: z.string().min(1, { message: "Please enter your current password" }).min(8, { message: 'Password must be at least 8 characters in length' }),
  newpassword: z.string().min(1, { message: "Please create a new password" }).min(8, { message: 'Password must be at least 8 characters in length' }),
  confirmpassword: z.string().min(1, { message: "Please confirm your new password" }).min(8, { message: 'Password must be at least 8 characters in length' }),
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
export const updateDetailsSchema = z.object({
  fullname: z.string().min(1, { message: "Please enter your fullname" }).min(3, { message: 'Full name should not be less than 3 characters' }),
});

export const reviewProductSchema = z.object({
  title: z.string().min(1, { message: "Please enter a title for the review" }).min(10, { message: 'Title must be at least 10 characters in length' }),
  comment: z.string().min(1, { message: "Please enter review's description" }).min(25, { message: 'Comment must be at least 25 characters in length' }),
})