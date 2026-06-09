const axios = require('axios');

exports.fetchGithubData = async () => {
    const username = process.env.GITHUB_USERNAME || 'BavDev';
    const token = process.env.GITHUB_TOKEN;

    const headers = { Accept: 'application/vnd.github.v3+json' };
    if (token) headers.Authorization = `token ${token}`;

    const [userRes, reposRes] = await Promise.all([
        axios.get(`https://api.github.com/users/${username}`, { headers }),
        axios.get(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers }),
    ]);

    const repos = reposRes.data.map((repo) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        url: repo.html_url,
        isFork: repo.fork,
        updatedAt: repo.updated_at,
    }));

    const languages = [...new Set(repos.map((r) => r.language).filter(Boolean))];

    return {
        profile: {
            username: userRes.data.login,
            name: userRes.data.name,
            bio: userRes.data.bio,
            avatarUrl: userRes.data.avatar_url,
            followers: userRes.data.followers,
            following: userRes.data.following,
            publicRepos: userRes.data.public_repos,
            publicGists: userRes.data.public_gists,
            githubUrl: userRes.data.html_url,
        },
        repositories: repos.filter((r) => !r.isFork),
        languages,
        totalStars: repos.reduce((sum, r) => sum + r.stars, 0),
        updatedAt: new Date().toISOString(),
    };
};