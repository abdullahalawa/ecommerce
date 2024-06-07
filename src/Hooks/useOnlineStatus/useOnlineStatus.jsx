import React, { useState } from "react";

export default function UseOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  window.addEventListener("online", function () {
    setIsOnline(true);
  });

  window.addEventListener("offline", function () {
    setIsOnline(false);
  });

  return isOnline;
}
