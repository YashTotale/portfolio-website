// Externals
import { FieldType } from "contentful";

// Internals
import client from "./client";
import Cache from "./cache";
import { Projects, ProjectFields } from "../Utils/types";

const ProjectsCache = new Cache();

const CACHE_KEYS = {
  fields: "project-fields",
  projects: "projects",
} as const;

export type ProjectTypes = Record<string, FieldType>;

// export const getProjectTypes = async (): Promise<ProjectTypes> => {
//   const cached = ProjectsCache.get<ProjectTypes>(CACHE_KEYS.fields);

//   if (cached) return cached;

//   const contentType = await client.getContentType("project");

//   const fields = contentType.fields.reduce(
//     (obj, field) => ({ ...obj, [field.id]: field.type }),
//     {} as ProjectTypes
//   );

//   ProjectsCache.set(CACHE_KEYS.fields, fields);

//   return fields;
// };

export const getProjects = async (): Promise<Projects> => {
  const cached = ProjectsCache.get<Projects>(CACHE_KEYS.projects);

  if (cached) return cached;

  const queriedProjects = await client.getEntries({
    content_type: "project",
  });

  const projects = queriedProjects.items.reduce(
    (obj, project) => ({
      ...obj,
      [project.sys.id]: project.fields as ProjectFields,
    }),
    {} as Projects
  );

  ProjectsCache.set(CACHE_KEYS.projects, projects);

  return projects;
};

export const getProject = async (
  id: string
): Promise<ProjectFields | undefined> => {
  const projects = await getProjects();
  return projects[id];
};
