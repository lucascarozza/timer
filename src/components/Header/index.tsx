import { NavLink } from "react-router-dom";
import { ClockFading, History, Timer } from "lucide-react";
import { HeaderContainer, NavigationList, NavigationItem } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <span>
        <ClockFading size={24} />
      </span>

      <nav aria-label="Navigation">
        <NavigationList role="list">
          <NavigationItem role="listitem">
            <NavLink to="/" title="Timer" aria-label="Timer Page">
              <Timer size={24} />
            </NavLink>
          </NavigationItem>

          <NavigationItem role="listitem">
            <NavLink to="/history" title="History" aria-label="History Page">
              <History size={24} />
            </NavLink>
          </NavigationItem>
        </NavigationList>
      </nav>
    </HeaderContainer>
  );
}
