const userSocketMap = new Map();

// Function to add a mapping between user ID and socket connection ID
export const addUserSocketMapping = (userId, socketId) => {
  userSocketMap.set(userId, socketId);
};

// Function to get the socket connection ID for a given user ID
export const getSocketIdByUserId = (userId) => {
  return userSocketMap.get(userId);
};

// Function to remove a user from the map when they disconnect
export const removeUserSocketMapping = (userId) => {
  userSocketMap.delete(userId);
};
