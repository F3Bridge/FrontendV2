import axios from "axios";

export const ax = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// For debugging purposes
(window as any).axios = ax;
