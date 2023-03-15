import uuid from "react-native-uuid";

function generateId() {
  return uuid.v4();
}

export default generateId;
