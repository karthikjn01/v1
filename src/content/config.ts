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
        from: z.date(),
        to: z.date().optional(),
        hasDetails: z.boolean().default(true),
        image: z.object({
            src: z.string(),
            alt: z.string(),
        }),
        author: z.string().default('Karthik Nooli'),
        tags: z.array(z.string()),
        canonicalURL: z.string().url(),
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


export const collections = {
    'projects': projectCollection,
    'photos': photosCollection
};