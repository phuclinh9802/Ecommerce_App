import React, { useEffect } from "react";

export function LoginSuccess() {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 5000);
  }, []);

  return <div>Thanks for loggin in!</div>;
}