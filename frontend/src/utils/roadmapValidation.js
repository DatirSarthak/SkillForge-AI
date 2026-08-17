import { z } from "zod";

export const roadmapValidationSchema = z.object({
  goal: z
    .string()
    .trim()
    .min(1, "Goal is required.")
    .max(500, "Goal must not exceed 500 characters."),

  currentSkills: z
    .string()
    .trim()
    .min(1, "Current skills are required.")
    .max(
      2000,
      "Current skills must not exceed 2000 characters."
    ),

  experienceLevel: z
    .string()
    .trim()
    .min(1, "Experience level is required.")
    .max(
      50,
      "Experience level must not exceed 50 characters."
    ),

  topic: z
    .string()
    .trim()
    .min(1, "Topic is required.")
    .max(
      150,
      "Topic must not exceed 150 characters."
    ),

  targetRole: z
    .string()
    .trim()
    .max(
      150,
      "Target role must not exceed 150 characters."
    )
    .optional()
    .or(z.literal("")),
});

export default roadmapValidationSchema;