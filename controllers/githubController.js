const { fetchGithubData } = require('../utils/githubFetcher');

let cachedData = null;
let lastFetched = 0;
const CACHE_DURATION = 3600000; // 1 hour

exports.getGithubStats = async (req, res, next) => {
    try {
        const now = Date.now();

        if (cachedData && now - lastFetched < CACHE_DURATION) {
            return res.status(200).json({
                success: true,
                data: cachedData,
                cached: true,
                cachedAt: new Date(lastFetched).toISOString(),
            });
        }

        const data = await fetchGithubData();
        cachedData = data;
        lastFetched = now;

        res.status(200).json({
            success: true,
            data,
            cached: false,
        });
    } catch (error) {
        // Return cached data if available, even if expired
        if (cachedData) {
            return res.status(200).json({
                success: true,
                data: cachedData,
                cached: true,
                stale: true,
            });
        }
        next(error);
    }
};