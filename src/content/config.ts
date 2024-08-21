// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';
// 2. Define your collection(s)
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"

const projectCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        role: z.string().optional(),
        from: z.date(),
        to: z.date().optional(),
        hasDetails: z.boolean().default(true),
        author: z.string().default('Karthik Nooli'),
        tags: z.array(z.enum(["career", "personal", "design", "achievements"])),
        draft: z.boolean().default(true),
    }),
});

const photosCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        image: z.object({
            src: z.string().url(),
            lil: z.string().url(),
            alt: z.string(),
        }),
        description: z.string(),
        date: z.date(),
    }),
});

const brandingCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        image: image(),
        imageAlt: z.string(),
        description: z.string(),
    }),
});


export const collections = {
    'projects': projectCollection,
    'photos': photosCollection,
    'branding': brandingCollection,
};