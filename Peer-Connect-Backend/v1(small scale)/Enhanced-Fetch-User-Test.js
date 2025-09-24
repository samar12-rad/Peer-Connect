/**
 * Test file for Enhanced Peer Finding Algorithm
 * This file contains test scenarios to verify the algorithm works correctly
 */

const testUsers = [
  {
    _id: '1',
    firstName: 'Alice',
    lastName: 'Smith',
    skills: [['React'], ['Node.js']],
    rating: 4.8,
    friends: ['2', '3'],
    friendRequests: [],
    isNewOrIncomplete: false
  },
  {
    _id: '2', 
    firstName: 'Bob',
    lastName: 'Johnson',
    skills: [['React'], ['Python']],
    rating: 4.2,
    friends: ['1'],
    friendRequests: ['4'],
    isNewOrIncomplete: true
  },
  {
    _id: '3',
    firstName: 'Carol',
    lastName: 'Williams',
    skills: [['Python'], ['AI/ML']],
    rating: 4.9,
    friends: ['1', '5'],
    friendRequests: [],
    isNewOrIncomplete: false
  },
  {
    _id: '4',
    firstName: 'David',
    lastName: 'Brown',
    skills: [['React'], ['Vue.js']],
    rating: 3.8,
    friends: [],
    friendRequests: [],
    isNewOrIncomplete: true
  },
  {
    _id: '5',
    firstName: 'Emma',
    lastName: 'Davis',
    skills: [['Node.js'], ['MongoDB']],
    rating: 4.5,
    friends: ['3'],
    friendRequests: [],
    isNewOrIncomplete: false
  }
];

const testSkills = ['React', 'Node.js'];
const currentUserId = '999'; // Not in the test data

/**
 * Test Algorithm Behavior:
 * 
 * 1. NEW FACES (Position 1):
 *    - Should prioritize users with isNewOrIncomplete = true
 *    - Should prefer users with fewer connections
 *    - Expected: Bob (new, fewer connections) or David (new, no connections)
 * 
 * 2. MOST RATED (Position 2):
 *    - Should prioritize users with highest ratings
 *    - Should consider skill match as secondary
 *    - Expected: Carol (4.9 rating, Python match) or Alice (4.8 rating, React+Node match)
 * 
 * 3. GOOD FIT (Position 3):
 *    - Should prioritize users with most matching skills
 *    - Alice has 2 matches (React, Node.js)
 *    - Bob has 1 match (React)
 *    - Expected: Alice (best skill match)
 * 
 * 4. RANDOM (Position 4):
 *    - Should be random selection from remaining users
 *    - Unpredictable but should not repeat previous selections
 * 
 * 5. RECENTLY ACTIVE (Position 5):
 *    - Should prioritize by _id timestamp (newer ObjectIds)
 *    - In test data, higher numbers = more recent
 *    - Expected: User with highest _id number
 */

/**
 * Expected Set Composition for Skills ['React', 'Node.js']:
 * 
 * Position 1 (New Face): David or Bob (both are new/incomplete)
 * Position 2 (Most Rated): Alice (4.8, best React+Node match) or Carol (4.9, highest rating)
 * Position 3 (Good Fit): Alice (perfect React+Node.js match)
 * Position 4 (Random): Any remaining user
 * Position 5 (Recently Active): User with highest _id (Emma = '5')
 * 
 * All users should have at least one matching skill with ['React', 'Node.js']
 * No user should appear twice in the same set
 * Users excluded: none (currentUserId '999' not in data)
 */

/**
 * Pagination Test:
 * 
 * With 4 matching users and set size of 5:
 * - Set 1: Should contain 4 users (all matching users)
 * - Set 2: Should be empty
 * - totalSets: Should be 1
 * - hasMoreSets: Should be false for set 1
 */

const expectedBehavior = {
  setSize: 5,
  totalMatchingUsers: 4, // Alice, Bob, David, Emma have React or Node.js
  totalSets: 1,
  biasPreventionStrategies: [
    'newFaces',
    'mostRated', 
    'goodFit',
    'random',
    'recentlyActive'
  ],
  excludedUsers: [], // None in this test case
  skillMatchScoring: {
    'Alice': 2, // React + Node.js
    'Bob': 1,   // React only
    'David': 1, // React only  
    'Emma': 1   // Node.js only
  }
};

console.log('Enhanced Peer Finding Algorithm Test Data');
console.log('Test Users:', testUsers.length);
console.log('Search Skills:', testSkills);
console.log('Expected Behavior:', expectedBehavior);

module.exports = {
  testUsers,
  testSkills,
  currentUserId,
  expectedBehavior
};