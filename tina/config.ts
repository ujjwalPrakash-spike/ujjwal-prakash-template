import { defineConfig } from "tinacms";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId:
    process.env.NEXT_PUBLIC_TINA_CLIENT_ID ||
    "cc01855d-c4b0-4c14-9b75-360527291439",
  token:
    process.env.TINA_TOKEN ||
    "c7baa131f9b0d90b0fbf7688cb332fda052f9b91",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      // 1. GLOBAL BRAND & CONTACT
      {
        name: "global",
        label: "Global Settings",
        path: "content/global",
        format: "json",
        ui: {
          global: true,
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "brandName",
            label: "Brand Name",
          },
          {
            type: "string",
            name: "wordmark",
            label: "Wordmark (Header / Nav)",
          },
          {
            type: "string",
            name: "tagline",
            label: "Tagline",
          },
          {
            type: "string",
            name: "contactEmail",
            label: "Contact Email",
          },
          {
            type: "string",
            name: "contactPhone",
            label: "Contact Phone",
          },
          {
            type: "string",
            name: "studioLocations",
            label: "Studio Locations (Footer)",
          },
        ],
      },

      // 2. HERO SECTION (HOME PAGE)
      {
        name: "hero",
        label: "Homepage Hero",
        path: "content/hero",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "eyebrow",
            label: "Eyebrow Badge",
          },
          {
            type: "string",
            name: "headlineLine1",
            label: "Headline Line 1",
          },
          {
            type: "string",
            name: "headlineLine2",
            label: "Headline Line 2",
          },
          {
            type: "string",
            name: "subcopy",
            label: "Subcopy Paragraph",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "backgroundVideo",
            label: "Background Video URL (MP4 / Stream)",
          },
          {
            type: "image",
            name: "posterImage",
            label: "Video Fallback Poster Image",
          },
          {
            type: "string",
            name: "primaryCtaText",
            label: "Primary CTA Text",
          },
          {
            type: "string",
            name: "primaryCtaHref",
            label: "Primary CTA Link",
          },
        ],
      },

      // 3. TEAM CAR SECTION
      {
        name: "car",
        label: "Team Car Showcase",
        path: "content/car",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "giantTitle",
            label: "Giant Backdrop Title (e.g. AMG GT3)",
          },
          {
            type: "string",
            name: "modelName",
            label: "Car Model Name",
          },
          {
            type: "string",
            name: "badge",
            label: "Specification Badge",
          },
          {
            type: "string",
            name: "description",
            label: "Car Technical Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "carCutoutImage",
            label: "Car Cutout PNG (Transparent Background)",
          },
          {
            type: "object",
            name: "specs",
            label: "Telemetry & Performance Specs",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: `${item?.label || "Spec"}: ${item?.value || ""} ${item?.unit || ""}`,
              }),
            },
            fields: [
              { type: "string", name: "label", label: "Spec Label" },
              { type: "number", name: "value", label: "Numeric Value" },
              { type: "string", name: "unit", label: "Unit (e.g. HP, NM, KM/H, KG)" },
              { type: "string", name: "detail", label: "Detail Description" },
            ],
          },
        ],
      },

      // 4. FACTORY DRIVERS
      {
        name: "drivers",
        label: "Factory Drivers",
        path: "content/drivers",
        format: "json",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Driver Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "number",
            label: "Car / Racing Number (e.g. 57)",
          },
          {
            type: "string",
            name: "nationality",
            label: "Nationality",
          },
          {
            type: "string",
            name: "role",
            label: "Driver Role / Category",
          },
          {
            type: "image",
            name: "image",
            label: "Driver Portrait",
          },
          {
            type: "string",
            name: "bio",
            label: "Driver Biography",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "stats",
            label: "Career Statistics",
            list: true,
            fields: [
              { type: "string", name: "label", label: "Stat Label" },
              { type: "string", name: "value", label: "Stat Value" },
            ],
          },
        ],
      },

      // 5. NEWS DISPATCHES
      {
        name: "news",
        label: "News Dispatches",
        path: "content/news",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Dispatch Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Publication Date",
          },
          {
            type: "string",
            name: "category",
            label: "Category / Discipline",
          },
          {
            type: "string",
            name: "excerpt",
            label: "Short Excerpt",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Photograph",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Dispatch Content",
            isBody: true,
          },
        ],
      },

      // 6. MERCHANDISE CAPSULE
      {
        name: "merch",
        label: "Merch Capsule",
        path: "content/merch",
        format: "json",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Product Name",
            isTitle: true,
            required: true,
          },
          {
            type: "number",
            name: "price",
            label: "Price (USD)",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
          },
          {
            type: "string",
            name: "badge",
            label: "Badge (e.g. LIMITED RUN, CORE SPEC)",
          },
          {
            type: "boolean",
            name: "available",
            label: "In Stock / Available",
          },
          {
            type: "image",
            name: "image",
            label: "Primary Image",
          },
          {
            type: "image",
            name: "hoverImage",
            label: "Hover Angle Image",
          },
          {
            type: "string",
            name: "description",
            label: "Product Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "specs",
            label: "Technical Specs",
            list: true,
          },
        ],
      },

      // 7. GALLERY & FILMS
      {
        name: "gallery",
        label: "Gallery & Films",
        path: "content/gallery",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "object",
            name: "films",
            label: "Cinematic Films",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: `${item?.title || "Film"} (${item?.duration || ""})`,
              }),
            },
            fields: [
              { type: "string", name: "title", label: "Film Title" },
              { type: "string", name: "duration", label: "Duration (e.g. 03:42)" },
              { type: "string", name: "provider", label: "Provider (Vimeo / MP4 / YouTube)" },
              { type: "string", name: "videoUrl", label: "Video URL / Embed Link" },
              { type: "image", name: "poster", label: "Film Poster Preview" },
              { type: "string", name: "description", label: "Description" },
            ],
          },
          {
            type: "object",
            name: "photos",
            label: "Exhibition Photographs",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.title || "Photograph",
              }),
            },
            fields: [
              { type: "string", name: "title", label: "Photo Title" },
              { type: "image", name: "image", label: "High-Res Image" },
              { type: "string", name: "category", label: "Category" },
              { type: "string", name: "caption", label: "Caption / Specimen Code" },
              { type: "number", name: "width", label: "Original Width (px)" },
              { type: "number", name: "height", label: "Original Height (px)" },
            ],
          },
        ],
      },
    ],
  },
});
