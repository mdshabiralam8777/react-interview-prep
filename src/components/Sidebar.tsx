// src/components/Sidebar.tsx
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const StyledNavLink = styled(NavLink)`
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e9ecef;
  }

  &.active {
    background-color: #e9ecef;
    font-weight: bold;
  }
`;

const Sidebar = () => {
  return (
    <Nav>
      <StyledNavLink to="/">Home</StyledNavLink>
      <StyledNavLink to="/counter">Counter</StyledNavLink>
      {/* <StyledNavLink to="/about">About</StyledNavLink>
      <StyledNavLink to="/contact">Contact</StyledNavLink> */}
    </Nav>
  );
};

export default Sidebar;