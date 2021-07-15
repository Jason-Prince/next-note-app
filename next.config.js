module.exports = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "https://next-note-app-one.vercel.app/:path*",
            },
        ];
    },
};
