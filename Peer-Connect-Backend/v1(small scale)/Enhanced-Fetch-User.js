const User = require('../models/userModel');

/**
 * Enhanced Peer Finding Algorithm
 * Finds peers in sets of 5 with different approaches to avoid bias:
 * 1. New/Fresh faces (users with fewer connections or new profiles)
 * 2. Most rated (users with highest ratings)
 * 3. Good fit (users with most matching skills)
 * 4. Random selection for diversity
 * 5. Recently active (based on profile updates)
 */
const enhancedFetchUsers = async (req, res) => {
  try {
    const { skills, setNumber = 1, userId: requestUserId } = req.body;
    const skillsArray = skills.map((skill) => [skill]);
    const currentUserId = req.session.userId;
    const setSize = 5;

    console.log(`Fetching set ${setNumber} for user ${currentUserId}`);

    // Get user's watched users and friends to exclude
    const currentUser = await User.findById(currentUserId);
    const excludedUsers = [
      currentUserId,
      ...(currentUser.watchedUsers || []),
      ...(currentUser.friends || []),
      ...(currentUser.friendRequests || [])
    ];

    // Base query to find users with matching skills
    const baseQuery = {
      _id: { $nin: excludedUsers },
      skills: { $in: skillsArray }
    };

    // Get all potential matches first
    const allMatches = await User.find(baseQuery);
    
    if (allMatches.length === 0) {
      return res.json({ 
        filteredUsers: [], 
        setNumber,
        totalSets: 0,
        message: "No users found with matching skills"
      });
    }

    // Calculate total possible sets
    const totalSets = Math.ceil(allMatches.length / setSize);

    // If requesting a set beyond available data, return empty
    if (setNumber > totalSets) {
      return res.json({ 
        filteredUsers: [], 
        setNumber,
        totalSets,
        message: "No more sets available"
      });
    }

    // Calculate skill match scores for each user
    const usersWithScores = allMatches.map(user => {
      const userSkills = user.skills.flat();
      const requestedSkills = skills;
      const matchingSkills = userSkills.filter(skill => 
        requestedSkills.some(reqSkill => 
          skill.toLowerCase().includes(reqSkill.toLowerCase()) ||
          reqSkill.toLowerCase().includes(skill.toLowerCase())
        )
      );
      
      return {
        ...user.toObject(),
        skillMatchScore: matchingSkills.length,
        skillMatchPercentage: (matchingSkills.length / requestedSkills.length) * 100
      };
    });

    // Apply different finding strategies
    const strategies = {
      newFaces: (users) => {
        // Prioritize users with fewer friends or new profiles
        return users.sort((a, b) => {
          const aConnectionCount = (a.friends?.length || 0) + (a.friendRequests?.length || 0);
          const bConnectionCount = (b.friends?.length || 0) + (b.friendRequests?.length || 0);
          
          // Secondary sort by isNewOrIncomplete flag
          if (a.isNewOrIncomplete && !b.isNewOrIncomplete) return -1;
          if (!a.isNewOrIncomplete && b.isNewOrIncomplete) return 1;
          
          return aConnectionCount - bConnectionCount;
        });
      },

      mostRated: (users) => {
        // Sort by rating (highest first), then by skill match
        return users.sort((a, b) => {
          const ratingDiff = (b.rating || 0) - (a.rating || 0);
          if (ratingDiff !== 0) return ratingDiff;
          return b.skillMatchScore - a.skillMatchScore;
        });
      },

      goodFit: (users) => {
        // Sort by skill match score and percentage
        return users.sort((a, b) => {
          const scoreDiff = b.skillMatchScore - a.skillMatchScore;
          if (scoreDiff !== 0) return scoreDiff;
          return b.skillMatchPercentage - a.skillMatchPercentage;
        });
      },

      random: (users) => {
        // Fisher-Yates shuffle for random selection
        const shuffled = [...users];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      },

      recentlyActive: (users) => {
        // Sort by profile update recency (assuming _id contains timestamp info)
        return users.sort((a, b) => {
          // Since we don't have lastActive field, use _id timestamp as proxy
          const aTime = a._id.getTimestamp();
          const bTime = b._id.getTimestamp();
          return bTime - aTime;
        });
      }
    };

    // Create diverse sets by mixing strategies
    const createDiverseSet = (users, setNumber) => {
      const setUsers = [];
      const usersPool = [...users];
      
      // Strategy distribution for each set position
      const strategyOrder = [
        'newFaces',    // Position 1: New face
        'mostRated',   // Position 2: Highly rated
        'goodFit',     // Position 3: Best skill match
        'random',      // Position 4: Random for diversity
        'recentlyActive' // Position 5: Recently active
      ];

      strategyOrder.forEach((strategy, index) => {
        if (usersPool.length === 0) return;
        
        const sortedUsers = strategies[strategy](usersPool);
        
        // For set pagination, skip users from previous sets
        const skipCount = (setNumber - 1) * setSize;
        const availableUsers = sortedUsers.slice(skipCount);
        
        if (availableUsers.length > 0) {
          const selectedUser = availableUsers[0];
          setUsers.push(selectedUser);
          
          // Remove selected user from pool to avoid duplicates
          const userIndex = usersPool.findIndex(u => u._id.toString() === selectedUser._id.toString());
          if (userIndex !== -1) {
            usersPool.splice(userIndex, 1);
          }
        }
      });

      // If we don't have enough users from strategies, fill with remaining users
      while (setUsers.length < setSize && usersPool.length > 0) {
        const randomIndex = Math.floor(Math.random() * usersPool.length);
        setUsers.push(usersPool.splice(randomIndex, 1)[0]);
      }

      return setUsers;
    };

    // Generate the requested set
    const diverseSet = createDiverseSet(usersWithScores, setNumber);

    // Add metadata for each user in the set
    const enrichedSet = diverseSet.map((user, index) => ({
      ...user,
      setPosition: index + 1,
      recommendationReason: getRecommendationReason(user, index),
    }));

    res.json({
      filteredUsers: enrichedSet,
      setNumber,
      totalSets,
      setSize,
      totalMatches: allMatches.length,
      skills: skillsArray,
      metadata: {
        hasMoreSets: setNumber < totalSets,
        currentSetSize: enrichedSet.length
      }
    });

  } catch (error) {
    console.error('Error in enhanced fetch users:', error);
    res.status(500).json({ 
      error: 'Error fetching users',
      message: error.message 
    });
  }
};

// Helper function to determine recommendation reason
const getRecommendationReason = (user, position) => {
  const reasons = [
    '🌟 New Face - Fresh connection opportunity',
    '⭐ Top Rated - Highly recommended by community',
    '🎯 Perfect Match - Great skill alignment',
    '🎲 Discover - Expand your network',
    '⚡ Active User - Recently updated profile'
  ];
  
  return reasons[position] || '🤝 Great Connection - Recommended for you';
};

module.exports = { enhancedFetchUsers };