import Container from "@/base/components/Container";
import { Spin } from "antd";
import { Suspense } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { UserProvider } from "./contexts/UserContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <Spin
          indicator={<LoadingOutlined style={{ color: "#692AFA" }} spin />}
          size="large"
        />
      }
    >
      <Container>
        <UserProvider>{children}</UserProvider>
      </Container>
    </Suspense>
  );
}
