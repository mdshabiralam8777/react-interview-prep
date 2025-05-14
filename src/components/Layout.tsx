// src/components/Layout.tsx
import styled from "styled-components";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const SidebarWrapper = styled.aside`
  flex: 0 0 250px;
  background: #f8f9fa;
  border-right: 1px solid #dee2e6;
  overflow-y: auto;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;
const WelcomeBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #f0f8ff;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 4px;
`;

const Layout = () => {
  const location = useLocation();
  return (
    <Container>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
      <MainContent>
        {location.pathname === "/" && (
          <WelcomeBanner>
            <h2>Welcome back!</h2>
            <p>
              Start by selecting an option from the sidebar to get to know that
              particular features
            </p>
          </WelcomeBanner>
        )}
        <Outlet />
      </MainContent>
    </Container>
  );
};

export default Layout;
