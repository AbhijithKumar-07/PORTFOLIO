import { useState, useEffect, useCallback } from 'react';
import {
  fetchCodeforcesRating,
  fetchLeetCodeRating,
  fetchCodeChefRating,
  fetchGFGStats,
  fetchRecentActivities,
  buildTimeline,
  BASELINE_CONTESTS
} from '../services/contestService';

const CACHE_KEY = 'cp_telemetry_live_v6';
const CACHE_TIME_KEY = 'cp_telemetry_time_v6';
const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;

export function useContestData() {
  const [data, setData] = useState(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && Array.isArray(parsed.recentActivities) && parsed.recentActivities.length > 0 && parsed.stats?.leetcode?.bestRank <= 1000) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Failed to parse cached ratings", e);
    }
    // Default verified baseline telemetry
    return {
      timeline: buildTimeline(
        BASELINE_CONTESTS.Codeforces,
        BASELINE_CONTESTS.LeetCode,
        BASELINE_CONTESTS.CodeChef
      ),
      stats: {
        codeforces: {
          currentRating: 1495,
          maxRating: 1495,
          rankTitle: "Specialist",
          bestRank: 103,
          totalContests: 12,
          username: "@AbhijithKumar07",
          url: "https://codeforces.com/profile/AbhijithKumar07"
        },
        leetcode: {
          currentRating: 1961,
          maxRating: 1961,
          rankTitle: "Knight",
          topPercentage: "Top 3.26%",
          bestRank: 215,
          totalContests: 9,
          username: "@AbhijithKumarDev",
          url: "https://leetcode.com/u/AbhijithKumarDev/"
        },
        codechef: {
          currentRating: 1749,
          maxRating: 1749,
          stars: "3★",
          bestRank: 23,
          totalContests: 7,
          username: "@abhijith_07",
          url: "https://www.codechef.com/users/abhijith_07"
        },
        gfg: {
          handle: "abhiyandr5wci",
          codingScore: 118,
          totalSolved: 31,
          solvedBreakdown: { easy: 8, medium: 20, hard: 3 },
          rankTitle: "Active Solver",
          username: "@abhiyandr5wci",
          url: "https://www.geeksforgeeks.org/profile/abhiyandr5wci?tab=activity"
        }
      },
      recentActivities: [
        {
          id: "act-lc-1",
          platform: "LeetCode",
          title: "Find Eventual Safe States",
          type: "Graph / Topological DFS",
          time: "4d ago",
          timestamp: 1792338199,
          badge: "Accepted · C++",
          url: "https://leetcode.com/problems/find-eventual-safe-states/",
          badgeColor: "bg-orange-500/15 text-orange-300 border-orange-500/30",
        },
        {
          id: "act-gh-1",
          platform: "GitHub",
          title: "Pushed to Code-Sync (refs/heads/main)",
          type: "Git Push Event",
          time: "3w ago",
          timestamp: 1790814122,
          badge: "main · Commit",
          url: "https://github.com/AbhijithKumar-07/Code-Sync",
          badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
        },
        {
          id: "act-lc-2",
          platform: "LeetCode",
          title: "Best Time to Buy and Sell Stock",
          type: "Dynamic Programming / Greedy",
          time: "1mo ago",
          timestamp: 1789989230,
          badge: "Accepted · C++",
          url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
          badgeColor: "bg-orange-500/15 text-orange-300 border-orange-500/30",
        },
        {
          id: "act-lc-3",
          platform: "LeetCode",
          title: "Course Schedule II",
          type: "Topological Sort / Kahn's Algo",
          time: "1mo ago",
          timestamp: 1789076853,
          badge: "Accepted · C++",
          url: "https://leetcode.com/problems/course-schedule-ii/",
          badgeColor: "bg-orange-500/15 text-orange-300 border-orange-500/30",
        },
        {
          id: "act-lc-4",
          platform: "LeetCode",
          title: "Course Schedule",
          type: "Cycle Detection / BFS",
          time: "1mo ago",
          timestamp: 1789075138,
          badge: "Accepted · C++",
          url: "https://leetcode.com/problems/course-schedule/",
          badgeColor: "bg-orange-500/15 text-orange-300 border-orange-500/30",
        },
      ],
      recentHighlights: [
        { platform: "Codeforces", name: "Codeforces Round 1091 (Div. 2)", rank: 103, rating: 1495, delta: "+378", badge: "Specialist", date: "Apr 2026" },
        { platform: "CodeChef", name: "Starters 240 (Div. 2)", rank: 23, rating: 1749, delta: "+91", badge: "Global #23", date: "May 2026" },
        { platform: "LeetCode", name: "Weekly Contest 504", rank: 215, rating: 1961, delta: "+91", badge: "Knight", date: "May 2026" },
        { platform: "LeetCode", name: "Weekly Contest 494", rank: 409, rating: 1672, delta: "+158", badge: "Top 3.26%", date: "Mar 2026" },
        { platform: "Codeforces", name: "Codeforces Round 1087 (Div. 2)", rank: 260, rating: 1249, delta: "+446", badge: "Global #260", date: "Mar 2026" },
        { platform: "CodeChef", name: "Starters 231 (Div. 3)", rank: 101, rating: 1607, delta: "+115", badge: "Global #101", date: "Mar 2026" }
      ]
    };
  });

  const [isSyncing, setIsSyncing] = useState(false);

  const syncRatings = useCallback(async () => {
    setIsSyncing(true);
    try {
      const [cf, lc, cc, gfg, activities] = await Promise.all([
        fetchCodeforcesRating(),
        fetchLeetCodeRating(),
        fetchCodeChefRating(),
        fetchGFGStats(),
        fetchRecentActivities(),
      ]);

      const timeline = buildTimeline(cf.contests, lc.contests, cc.contests);

      const stats = {
        codeforces: {
          currentRating: cf.currentRating,
          maxRating: cf.maxRating,
          rankTitle: cf.rankTitle,
          bestRank: cf.bestRank,
          totalContests: cf.totalContests,
          username: "@AbhijithKumar07",
          url: "https://codeforces.com/profile/AbhijithKumar07"
        },
        leetcode: {
          currentRating: lc.currentRating,
          maxRating: lc.maxRating,
          rankTitle: lc.rankTitle,
          topPercentage: lc.topPercentage || "Top 3.26%",
          bestRank: lc.bestRank,
          totalContests: lc.totalContests,
          username: "@AbhijithKumarDev",
          url: "https://leetcode.com/u/AbhijithKumarDev/"
        },
        codechef: {
          currentRating: cc.currentRating,
          maxRating: cc.maxRating,
          stars: cc.stars,
          bestRank: cc.bestRank,
          totalContests: cc.totalContests,
          username: "@abhijith_07",
          url: "https://www.codechef.com/users/abhijith_07"
        },
        gfg: {
          handle: gfg.handle,
          codingScore: gfg.codingScore,
          totalSolved: gfg.totalSolved,
          solvedBreakdown: gfg.solvedBreakdown,
          rankTitle: gfg.rankTitle,
          username: `@${gfg.handle}`,
          url: gfg.url
        }
      };

      const recentHighlights = [
        { platform: "Codeforces", name: "Codeforces Round 1091 (Div. 2)", rank: 103, rating: 1495, delta: "+378", badge: "Specialist", date: "Apr 2026" },
        { platform: "CodeChef", name: "Starters 240 (Div. 2)", rank: 23, rating: 1749, delta: "+91", badge: "Global #23", date: "May 2026" },
        { platform: "LeetCode", name: "Weekly Contest 504", rank: 215, rating: 1961, delta: "+91", badge: "Knight", date: "May 2026" },
        { platform: "LeetCode", name: "Weekly Contest 494", rank: 409, rating: 1672, delta: "+158", badge: "Top 3.26%", date: "Mar 2026" },
        { platform: "Codeforces", name: "Codeforces Round 1087 (Div. 2)", rank: 260, rating: 1249, delta: "+446", badge: "Global #260", date: "Mar 2026" },
        { platform: "CodeChef", name: "Starters 231 (Div. 3)", rank: 101, rating: 1607, delta: "+115", badge: "Global #101", date: "Mar 2026" }
      ];

      const payload = { timeline, stats, recentActivities: activities, recentHighlights };
      setData(payload);

      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
        localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
      } catch (e) {
        // Storage quota
      }
    } catch (err) {
      console.error("Auto sync error:", err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Automatic background update twice a day / check on mount
  useEffect(() => {
    const lastSyncTime = Number(localStorage.getItem(CACHE_TIME_KEY) || 0);
    const now = Date.now();

    // If cache is older than 12 hours, doesn't exist, or missing recentActivities, auto sync immediately
    if (!data?.recentActivities?.length || now - lastSyncTime > TWELVE_HOURS_MS) {
      syncRatings();
    }

    // Set recurring auto-refresh timer for twice a day (every 12 hours)
    const interval = setInterval(() => {
      syncRatings();
    }, TWELVE_HOURS_MS);

    return () => clearInterval(interval);
  }, [syncRatings]);

  return {
    timeline: data.timeline,
    stats: data.stats,
    recentActivities: data.recentActivities,
    recentHighlights: data.recentHighlights,
    isSyncing,
  };
}
