import { useEffect, useState } from "react";
import "./styles/Header.css";

function Header() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(storedUser);
    } else {
      const name = prompt("Please enter your name");
      if (name) {
        localStorage.setItem("user", name);
        setUser(name);
      } else {
        setUser("friend");
      }
    }
  }, []);

  return (
    <div className="header">
      <h1>
        HI,{" "}
        {user ? (
          <>
            <span className="user-name">{`${user}`}</span>
            <span>!</span>
          </>
        ) : (
          "!"
        )}
      </h1>
    </div>
  );
}

export default Header;
