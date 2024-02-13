import * as z from "zod";
export declare const playgroundSchema: z.ZodObject<{
    name: z.ZodString;
    address: z.ZodString;
    post_code: z.ZodString;
    city: z.ZodString;
    region: z.ZodString;
    country: z.ZodString;
    longitude: z.ZodNumber;
    latitude: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    address: string;
    post_code: string;
    city: string;
    region: string;
    country: string;
    longitude: number;
    latitude: number;
}, {
    name: string;
    address: string;
    post_code: string;
    city: string;
    region: string;
    country: string;
    longitude: number;
    latitude: number;
}>;
