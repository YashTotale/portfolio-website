// Externals
import { createClient } from "contentful";
import Logger from "@hack4impact/logger";

// Internals
import { Dict, writeData } from "./helpers";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? "",
});

const getContent = () => {
  const contentTypes = [
    "experience",
    "education",
    "project",
    "article",
    "tag",
    "badge",
    "provider",
    "book",
    "main",
  ];

  return Promise.all(
    contentTypes.map(async (type) => {
      const entries = await client.getEntries({
        content_type: type,
        include: 0,
      });

      const parsed = entries.items.reduce((obj, item) => {
        return {
          ...obj,
          [item.sys.id]: {
            ...(item.fields as Dict),
            id: item.sys.id,
          },
        };
      }, {});

      await writeData(parsed, type);
    })
  );
};

const getAssets = async () => {
  const assets = await client.getAssets();

  const parsed = assets.items.reduce((obj, asset) => {
    return { ...obj, [asset.sys.id]: { ...asset.fields } };
  }, {});

  await writeData(parsed, "assets");
};

const getData = async (): Promise<void> => {
  Logger.log("Fetching data...");

  await Promise.all([getContent(), getAssets()]);

  Logger.success("Successfully fetched data!");
  Logger.line();
};

export default getData;
