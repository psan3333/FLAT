/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'avatars.githubusercontent.com',
            'lh3.googleusercontent.com',
            'res.cloudinary.com'
        ]
    },
    env: {
        DATABASE_URL: "mongodb+srv://alexey:alexey@cluster0.2osdmyp.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0",
        NEXTAUTH_SECRET: 'NEXTAUTH_SECRET',

        GITHUB_ID: '5eddd471890e43731329',
        GITHUB_SECRET: 'f76dc5fae7c930562eacd1b097fd4cab50339d94',

        GOOGLE_CLIENT_ID: '72478522447-jmbeflgvkd5sed2vhnapf4nokq3kbmmf.apps.googleusercontent.com',
        GOOGLE_CLIENT_SECRET: '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',

        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "ddkj7auos",
        YANDEX_MAPS_API_KEY: 'f6dc3e72-3da2-488a-9788-ef2e2aa8a7e4',
        YANDEX_MAPS_SUGGEST_API_KEY: '6fbcaaf9-90ff-4977-84e9-e3d0ba99c663',
    }
};

export default nextConfig;
